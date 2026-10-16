import { memo, useState } from "react";
import { useWindowDimensions, View } from "react-native";

import { color as themeColor, font } from "../theme/tokens";

import { NUMBER_FLOW_FONT_SIZE } from "./const";
import { Digit } from "./digit";
import { Separator } from "./separator";
import { styles } from "./styles";
import type { INumberFlowProps } from "./types";

const NumberFlow = memo(
  ({
    value,
    padStart = false,
    decimals,
    decimalSeparator = ".",
    groupSeparator,
    fontSize = NUMBER_FLOW_FONT_SIZE,
    color = themeColor.label,
    fontWeight = "600",
    fontFamily = font.display,
    style,
  }: INumberFlowProps) => {
    const { fontScale } = useWindowDimensions();
    const safeValue = Number.isFinite(value) ? value : 0;
    const absValue = Math.abs(safeValue);

    const formatted =
      decimals != null ? absValue.toFixed(decimals) : absValue.toString();
    const [integerPart, decimalPart = ""] = formatted.split(".");

    const integerValue = parseInt(integerPart, 10) || 0;
    const liveIntCount = Math.max(integerPart.length, padStart ? 2 : 1);
    const liveDecCount = decimalPart.length;
    // Retain columns for exit animations; only newly mounted columns enter.
    const [fields, setFields] = useState({
      intCount: liveIntCount, decCount: liveDecCount,
      enteredIntFrom: 0, enteredDecFrom: 0,
    });
    const intCount = Math.max(fields.intCount, liveIntCount);
    const decCount = Math.max(fields.decCount, liveDecCount);
    if (intCount !== fields.intCount || decCount !== fields.decCount) {
      setFields({
        intCount, decCount,
        enteredIntFrom: fields.intCount, enteredDecFrom: fields.decCount,
      });
    }
    const { enteredIntFrom, enteredDecFrom } = fields;

    const intColumns = Array.from({ length: intCount }, (_, i) => {
      const digitsToRight = intCount - i - 1;
      return {
        place: Math.pow(10, digitsToRight),
        active: i >= intCount - liveIntCount,

        hasSep:
          !!groupSeparator && digitsToRight > 0 && digitsToRight % 3 === 0,
        enter: enteredIntFrom > 0 && i < intCount - enteredIntFrom,
      };
    });

    const decimalValue = decCount
      ? parseInt(decimalPart.padEnd(decCount, "0"), 10) || 0
      : 0;
    const decColumns = Array.from({ length: decCount }, (_, i) => ({
      place: Math.pow(10, decCount - i - 1),
      active: i < liveDecCount,
      enter: enteredDecFrom > 0 && i >= enteredDecFrom,
    }));

    // Match Text's title ramp and cap while keeping rolling cells measurable.
    const glyphProps = { fontSize: fontSize * Math.min(fontScale, 1.4), color, fontWeight, fontFamily };

    return (
      <View aria-hidden importantForAccessibility="no-hide-descendants" style={[styles.row, style]}>
        <Separator char="-" active={safeValue < 0} {...glyphProps} />

        {intColumns.map((col, i) => (
          <View key={`int-${col.place}`} style={styles.row}>
            <Digit
              value={integerValue}
              place={col.place}
              active={col.active}
              enter={col.enter}
              {...glyphProps}
            />
            {col.hasSep && groupSeparator && (
              <Separator
                char={groupSeparator}
                active={col.active && intColumns[i + 1]?.active === true}
                {...glyphProps}
              />
            )}
          </View>
        ))}

        {decCount > 0 && (
          <>
            <Separator
              char={decimalSeparator}
              active={liveDecCount > 0}
              {...glyphProps}
            />
            {decColumns.map((col) => (
              <Digit
                key={`dec-${col.place}`}
                value={decimalValue}
                place={col.place}
                active={col.active}
                enter={col.enter}
                {...glyphProps}
              />
            ))}
          </>
        )}
      </View>
    );
  },
);

NumberFlow.displayName = "NumberFlow";

export { NumberFlow };

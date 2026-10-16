import { Button, Column, Slider, Switch } from '@expo/ui';
import { Stack } from 'expo-router';
import { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

import { Text } from '@/theme/text';
import { ThemedHost } from '@/theme/themed-host';
import { screenInset, space } from '@/theme/tokens';

// ponytail: foundations smoke screen (STO-604/607). Becomes /dev/catalog in STO-620.
export default function FoundationsScreen() {
  const [on, setOn] = useState(true);
  const [level, setLevel] = useState(0.6);

  return (
    <ScrollView contentInsetAdjustmentBehavior="automatic" contentContainerStyle={styles.content}>
      <Stack.Screen options={{ title: 'Is This Tasty?' }} />

      <View style={styles.group}>
        <Text variant="eyebrow">Typography</Text>
        <Text variant="display">Is This Tasty?</Text>
        <Text variant="title">Pliny the Elder</Text>
        <Text variant="subtitle">Russian River Brewing</Text>
        <Text variant="body">Piney, resinous, bone dry. Dangerously drinkable for 8%.</Text>
        <Text variant="label">Log a pour</Text>
        <Text variant="meta">412 ratings</Text>
      </View>

      <View style={styles.group}>
        <Text variant="eyebrow">Native controls</Text>
        <ThemedHost matchContents={{ vertical: true }}>
          <Column spacing={space[4]}>
            <Switch value={on} onValueChange={setOn} label="Share to club" />
            <Slider value={level} onValueChange={setLevel} />
            <Button label="Log a pour" onPress={() => setOn((v) => !v)} />
          </Column>
        </ThemedHost>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: { padding: screenInset, gap: space[6] },
  group: { gap: space[2] },
});

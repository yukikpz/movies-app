import React, { useRef } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import ActionSheet from "react-native-actionsheet";

const categories = [
  { label: "now_playing", value: "now_playing" },
  { label: "popular", value: "popular" },
  { label: "top_rated", value: "top_rated" },
  { label: "upcoming", value: "upcoming" },
];

export default function CategoryActionSheet({ category, setCategory }) {
  const actionSheetRef = useRef();

  const options = categories.map((c) => c.label).concat("Cancel");

  const selectedIndex = categories.findIndex((c) => c.value === category);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => actionSheetRef.current.show()}
      >
        <Text style={styles.buttonText}>
          {categories[selectedIndex]?.label}
        </Text>
      </TouchableOpacity>
      <ActionSheet
        ref={actionSheetRef}
        options={options}
        cancelButtonIndex={options.length - 1}
        onPress={(index) => {
          if (index < categories.length) {
            setCategory(categories[index].value);
          }
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 8,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  button: {
    width: "60%",
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
  },
  buttonText: {
    fontSize: 16,
  },
});

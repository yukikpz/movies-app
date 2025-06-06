import React, { useRef } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import ActionSheet from "react-native-actionsheet";

const searchTypes = [
  { label: "movie", value: "movie" },
  { label: "multi", value: "multi" },
  { label: "tv", value: "tv" },
];

export default function SearchTypeActionSheet({ searchType, setSearchType }) {
  const actionSheetRef = useRef();

  const options = searchTypes.map((c) => c.label).concat("Cancel");

  const selectedIndex = searchTypes.findIndex((c) => c.value === searchType);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => actionSheetRef.current.show()}
      >
        <Text style={styles.buttonText}>
          {searchTypes[selectedIndex]?.label || "Select Search Type"}
        </Text>
      </TouchableOpacity>
      <ActionSheet
        ref={actionSheetRef}
        options={options}
        cancelButtonIndex={options.length - 1}
        onPress={(index) => {
          if (index < searchTypes.length) {
            setSearchType(searchTypes[index].value);
          }
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        // padding: 8,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff",
        flex: 1,
        marginRight: 10
      },
      button: {
        width: "100%",
        backgroundColor: "#fff",
        padding: 10,
        borderRadius: 8,
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#ccc",
      },
      buttonText: {
        fontSize: 16,
      },
});

import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  Image,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import axios from "axios";
import SearchTypeActionSheet from "../components/SearchTypeActionSheet";

const apiKey = process.env.EXPO_PUBLIC_API_KEY;

export default function SearchScreen({ navigation }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchType, setSearchType] = useState("multi");

  // useEffect(() => {
  //   // console.log("useEffect called");
  //   searchResults();
  // }, [searchType]);

  const searchResults = async () => {
    if (!query.trim()) return;
    setLoading(true);
    try {
      const res = await axios.get(
        `https://api.themoviedb.org/3/search/${searchType}?api_key=${apiKey}&query=${encodeURIComponent(
          query
        )}`
      );
      setResults(res.data.results || []);
    } catch (e) {
      setResults([]);
    }
    setLoading(false);
  };

  return (
    <View style={{ flex: 1, padding: 20, backgroundColor: "#fff" }}>
      <Text>Search Movie/TV Show Name</Text>
      <TextInput
        style={styles.input}
        placeholder="i.e. James Bond, CSI"
        value={query}
        onChangeText={setQuery}
        onSubmitEditing={searchResults}
        returnKeyType="search"
      />
      <Text>Choose Search Type</Text>
      <View
        style={{
          flexDirection: "row",
          marginBottom: 16,
          marginTop: 16,
          justifyContent: "center",
          alignContent: "center",
        }}
      >
        <SearchTypeActionSheet
          searchType={searchType}
          setSearchType={setSearchType}
        />
        <View>
          {/* <Button title="Search" onPress={searchMovies} /> */}
          <TouchableOpacity
            style={styles.searchButton}
            onPress={searchResults}
            activeOpacity={0.7}
          >
            <Text style={styles.searchButtonText}>Search</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Text style={styles.smallText}>Please select a search type</Text>

      {loading && <ActivityIndicator size="large" style={{ marginTop: 16 }} />}

      <FlatList
        data={results}
        keyExtractor={(item) =>
          item.id ? item.id.toString() : Math.random().toString()
        }
        contentContainerStyle={styles.list}
        renderItem={({ item }) =>
          item.poster_path ? (
            <View
              style={[
                styles.item,
                {
                  flexDirection: "row",
                  justifyContent: "flex-start",
                  alignItems: "center",
                },
              ]}
            >
              <Image
                source={{
                  uri: `https://image.tmdb.org/t/p/w200${item.poster_path}`,
                }}
                style={styles.poster}
              />
              <View style={styles.itemContent}>
                <Text style={styles.title}>{item.title || item.name}</Text>
                <Text style={styles.text}>
                  Popularity: {item.popularity || ""}
                </Text>
                <Text style={styles.text}>
                  Release Date: {item.release_date || item.first_air_date}
                </Text>
                {navigation && (
                  <TouchableOpacity
                    style={styles.detailButton}
                    onPress={() =>
                      navigation.navigate("Details", {
                        id: item.id,
                        mediaType: "movie",
                        title: item.title || item.name,
                      })
                    }
                  >
                    <Text style={styles.detailButtonText}>More Details</Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          ) : null
        }
        ListEmptyComponent={
          !loading && (
            <Text
              style={{
                textAlign: "center",
                marginTop: 100,
                fontWeight: "bold",
                fontSize: 24,
              }}
            >
              Please initiate a search
            </Text>
          )
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    // flex: 1,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    // marginRight: 8,
    marginTop: 4,
    marginBottom: 4,
    height: 40,
    backgroundColor: "#fff",
  },
  list: {
    // padding: 16,
  },
  itemContent: {
    flex: 1,
    minWidth: 0,
    alignItems: "flex-start",
  },
  item: {
    padding: 16,
    borderColor: "#ccc",
    backgroundColor: "#fff",
  },
  poster: {
    width: 100,
    height: 120,
    marginRight: 16,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
  },
  text: {
    fontSize: 12,
  },
  smallText: {
    fontSize: 12,
    marginBottom: 20
  },
  searchButton: {
    width: "100%",
    backgroundColor: "#017bf3",
    // paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 6,
    // marginTop: 8,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  searchButtonText: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
  },
  detailButton: {
    width: "100%",
    backgroundColor: "#017bf3",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 6,
    marginTop: 8,
  },
  detailButtonText: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
  },
});

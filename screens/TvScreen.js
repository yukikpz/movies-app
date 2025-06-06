import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import axios from "axios";
import TvCategoryActionSheet from "../components/TvCategoryActionSheet";

const apiKey = process.env.EXPO_PUBLIC_API_KEY;

export default function TvScreen({ navigation }) {
  const [tvShows, setTvShows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState("popular");

  useEffect(() => {
    console.log("useEffect called");

    fetchTvShows();
  }, [category]);

  const fetchTvShows = async () => {
    setLoading(true);
    console.log(apiKey);

    try {
      const res = await axios.get(
        `https://api.themoviedb.org/3/tv/${category}?api_key=${apiKey}`
      );
      //   console.log(API_KEY)

      //   console.log("data", res.data)
      setTvShows(res.data.results);
    } catch (e) {
      console.log("Failed to load tv shows");
      if (e.response) {
        console.log("error response data:", e.response.data);
        console.log("error status:", e.response.status);
      } else if (e.request) {
        console.log("error request:", e.request);
      } else {
        console.log("error message:", e.message);
      }
    }
    setLoading(false);
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <TvCategoryActionSheet category={category} setCategory={setCategory} />

      <FlatList
        data={tvShows}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
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
            {item.poster_path ? (
              <Image
                source={{
                  uri: `https://image.tmdb.org/t/p/w500${item.poster_path}`,
                }}
                style={styles.poster}
                resizeMode="cover"
              />
            ) : null}
            <View style={styles.itemContent}>
              <Text style={styles.title}>{item.name}</Text>
              <Text style={styles.text}>Popularity: {item.popularity}</Text>
              <Text style={styles.text}>
                Release Date: {item.first_air_date}
              </Text>
              <TouchableOpacity
                style={styles.detailButton}
                onPress={() =>
                  navigation.navigate("Details", {
                    id: item.id,
                    mediaType: "tv",
                    title: item.title || item.name,
                  })
                }
              >
                <Text style={styles.detailButtonText}>More Details</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
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
    backgroundColor: "#eee",
  },
  title: {
    fontWeight: "bold",
    fontSize: 16,
  },
  text: {
    fontSize: 12,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
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

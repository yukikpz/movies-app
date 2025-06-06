import { View, Text, Image, StyleSheet, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";

const apiKey = process.env.EXPO_PUBLIC_API_KEY;

export default function DetailsScreen({ route }) {
  const { id, mediaType } = route.params;
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  console.log(id, mediaType);

  useEffect(() => {
    const fetchDetails = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          `https://api.themoviedb.org/3/${mediaType}/${id}?api_key=${apiKey}`
        );
        console.log(res.data);
        setData(res.data);
      } catch (e) {
        console.log("error");
        console.log(e.response?.data || e.message);
        setData(null);
      }
      setLoading(false);
    };
    fetchDetails();
  }, [id, mediaType]);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    );
  }
  if (!data) {
    return (
      <View style={styles.center}>
        <Text>Failed to load details.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{data.title || data.name}</Text>
      {data.poster_path && (
        <Image
          source={{
            uri: `https://image.tmdb.org/t/p/w500${data.poster_path}`,
          }}
          style={styles.poster}
          resizeMode="cover"
        />
      )}
      <Text style={styles.text}>{data.overview}</Text>
      <Text style={styles.text}>Popularity: {data.popularity} | Release Date: {data.release_date || data.first_air_date}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 40,
    alignItems: "center",
    backgroundColor: "#fff",
  },
  poster: {
    width: 200,
    height: 200,
    marginBottom: 30,
    backgroundColor: "#eee",
  },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 40 },
  text: { fontSize: 14, marginBottom: 8, justifyContent: "flex-start" },
});

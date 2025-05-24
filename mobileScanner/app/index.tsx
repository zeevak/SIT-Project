import {
  Image,
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Pressable,
  TextInput,
  Alert,
  ImageBackground,
} from "react-native";
import { Link, Stack } from "expo-router";
import { useCameraPermissions } from "expo-camera";
import { useState } from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React from "react";
import { Feather } from "@expo/vector-icons";

export default function Home() {
  const [permission, requestPermission] = useCameraPermissions();
  const [code, setCode] = useState("");
  const [checked, setChecked] = useState(false);
  const [stationName, setStationName] = useState("");
  const [stationId, setStationId] = useState("");
  const [fuelStationId, setFuelStationId] = useState("");
  const isPermissionGranted = Boolean(permission?.granted);

  const saveData = async (id, name, fuelStationId) => {
    try {
      await AsyncStorage.setItem("stationId", id);
      await AsyncStorage.setItem("stationName", name);
      await AsyncStorage.setItem("fuelStationId", fuelStationId.toString());

      const stId = await AsyncStorage.getItem("stationId");
      const stName = await AsyncStorage.getItem("stationName");
      const fsId = await AsyncStorage.getItem("fuelStationId");

      setStationId(stId);
      setStationName(stName);
      setFuelStationId(fsId);
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };

  const handleCheck = async () => {
    try {
      const response = await axios.post(
        `https://3e32-192-248-24-51.ngrok-free.app/api/station/mobile/${code}`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.data.statusCode === 200) {
        setChecked(true);
        saveData(
          response.data.stationDto.stationId,
          response.data.stationDto.dealerName,
          response.data.stationDto.id
        );
        Alert.alert("Code Confirmed Successfully");
      }
    } catch (err) {
      console.log(err);
      setChecked(false);
    } finally {
      setCode("");
    }
  };

  return (
    <ImageBackground
      source={require("./images/fuel_image.jpeg")}
      style={styles.background}
      resizeMode="cover"
    >
      <SafeAreaView style={styles.container}>
        <Stack.Screen options={{ title: "Overview", headerShown: false }} />

        {/* Logo Section */}
        <View style={styles.logoContainer}>
          <Image
            source={require("./images/Logo.png")}
            style={styles.headerImage}
          />
          {stationId ? (
            <Text style={styles.stationDetail}>
              {stationId}: {stationName}
            </Text>
          ) : (
            <Text style={styles.station}></Text>
          )}
        </View>

        {/* Input + Button Section */}
        <View style={styles.contentContainer}>
          {!checked && (
            <>
              <TextInput
                style={styles.inputBox}
                value={code}
                onChangeText={setCode}
                placeholder="Enter login code"
                placeholderTextColor="gray"
                keyboardType="default"
              />

              <Pressable style={styles.scanButton} onPress={handleCheck}>
                <Text style={styles.buttonText}>Check Code</Text>
              </Pressable>
            </>
          )}

          <Pressable onPress={requestPermission}>
            <Feather name="camera" size={32} color="#0E7AFE" />
          </Pressable>

          {checked && (
            <Link href={"/scanner"} asChild>
              <Pressable disabled={!isPermissionGranted}>
                <Text
                  style={[
                    styles.buttonStyle,
                    { opacity: !isPermissionGranted ? 0.5 : 1 },
                  ]}
                >
                  Scan Code
                </Text>
              </Pressable>
            </Link>
          )}
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    paddingTop: 60,
    backgroundColor: "rgba(0, 0, 0, 0.5)", // optional dark overlay
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 40,
  },
  headerImage: {
    width: 200,
    height: 150,
    resizeMode: "contain",
    marginBottom: 10,
  },
  station: {
    textAlign: "center",
    marginTop: 10,
  },
  stationDetail: {
    textAlign: "center",
    marginTop: 10,
    fontWeight: "bold",
    fontSize: 20,
    color: "white",
  },
  contentContainer: {
    gap: 20,
    width: "80%",
    alignItems: "center",
  },
  inputBox: {
    height: 50,
    width: "100%",
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    fontSize: 18,
    paddingLeft: 10,
    color: "white",
    backgroundColor: "rgba(0, 0, 0, 0.3)",
  },
  scanButton: {
  backgroundColor: "#28a745", // Green color 
  paddingVertical: 14,
  width: "100%", 
  borderRadius: 8,
  alignItems: "center",
},
  buttonText: {
  color: "#fff",
  fontSize: 18,
  fontWeight: "bold",
},

  buttonStyle: {
    color: "#0E7AFE",
    fontSize: 20,
    textAlign: "center",
    marginTop: 10,
  },
});

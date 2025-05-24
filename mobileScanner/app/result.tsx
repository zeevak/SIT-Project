import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
} from "react-native";
import { useGlobalSearchParams, useRouter } from "expo-router";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function ResultScreen() {
  const {
    license_plate_no,
    vehicleType,
    fuelType,
    availableFuelCapacity,
    vehicleId,
    userId,
  } = useGlobalSearchParams();

  const router = useRouter();
  const [stationId, setStationId] = useState();
  const [enteredFuelAmount, setEnteredFuelAmount] = useState("");
  const [telNo, setTelNo] = useState(0);

  const handleButtonPress = (value: string) => {
    setEnteredFuelAmount((prev) => prev + value);
  };

  const handleDelete = () => {
    setEnteredFuelAmount((prev) => prev.slice(0, -1));
  };

  const data = {
    stationId: stationId,
    fuelType: fuelType,
    fuelAmount: enteredFuelAmount,
  };

  useEffect(() => {
    const fetchStationId = async () => {
      try {
        const fuelId = await AsyncStorage.getItem("stationId");
        setStationId(fuelId);
      } catch (error) {
        console.error("Error fetching fuel station ID:", error);
      }
    };

    fetchStationId();
  }, []);

  const handleSubmit = async () => {
    if (enteredFuelAmount === "") {
      Alert.alert("Error", "Please enter the amount of fuel.");
      return;
    }
    if (Number(enteredFuelAmount) <= Number(availableFuelCapacity)) {
      try {
        const response = await axios.post(
          `https://43c8-2402-4000-13f3-d2b3-4dc9-9a03-4b48-a3f8.ngrok-free.app/api/fuelAllocation/add/${vehicleId}/${userId}`,
          data,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        await axios.post(
          `https://43c8-2402-4000-13f3-d2b3-4dc9-9a03-4b48-a3f8.ngrok-free.app/api/${vehicleId}/update-fuel`,
          enteredFuelAmount,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const response4 = await axios.get(
          `https://43c8-2402-4000-13f3-d2b3-4dc9-9a03-4b48-a3f8.ngrok-free.app/api/findfuel/${fuelType}`
        );
        const price = response4.data.fuelPriceDtoList[0].price;

        const Total = (Number(price) * Number(enteredFuelAmount)).toFixed(2);
        Alert.alert(
          "Fuel Submitted",
          `Amount: ${enteredFuelAmount}L\nCost:${Total}Rs`
        );
        router.back();
      } catch (error) {
        Alert.alert("Error", "Failed to submit fuel amount.");
      }

      try {
        const body = {
          fuelType: fuelType,
          quantity: enteredFuelAmount,
        };
        const stLicense = await AsyncStorage.getItem("fuelStationId");

        await axios.post(
          `https://43c8-2402-4000-13f3-d2b3-4dc9-9a03-4b48-a3f8.ngrok-free.app/api/fuel/updatefuel/${stLicense}`,
          body
        ),
          {
            headers: {
              "Content-Type": "application/json",
            },
          };
      } catch (error) {}

      try {
        const stLicense = await AsyncStorage.getItem("stationId");
        const now = new Date();
        const formattedDateTime = now.toLocaleString();

        const response = await axios.post(
          "https://43c8-2402-4000-13f3-d2b3-4dc9-9a03-4b48-a3f8.ngrok-free.app/api/notifications/generateNotifications",
          {},
          {
            params: {
              telno: "+94743159018",
              message: `${enteredFuelAmount}L ${fuelType} pumped to ${license_plate_no} in station ${stLicense} at ${formattedDateTime}`,
            },
          }
        );

        if (response.data.statusCode !== 200) {
          Alert.alert("Error", "Failed to send notification.");
        }
      } catch (error) {
        Alert.alert("Error", "An error occurred while sending the notification.");
      }
    } else {
      Alert.alert("Error", "Not enough fuel capacity available.");
    }
  };

  const handleDotPress = () => {
    if (!enteredFuelAmount.includes(".")) {
      setEnteredFuelAmount((prev) => prev + ".");
    }
  };

  useEffect(() => {
    const fetchMobileNumber = async () => {
      try {
        const response = await axios.get(
          `https://43c8-2402-4000-13f3-d2b3-4dc9-9a03-4b48-a3f8.ngrok-free.app/api/account/${userId}`
        );
        setTelNo(response.data.userAccountDto.telno);
      } catch (error) {
        Alert.alert("Error", "Failed to fetch mobile number.");
      }
    };
    fetchMobileNumber();
  }, [userId]);

  useEffect(() => {
    if (telNo) {
      console.log("Updated telNo:", telNo);
    }
  }, [telNo]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.card}>
        <Text style={styles.heading}>Vehicle Details</Text>
        <Text style={styles.plate}>{license_plate_no}</Text>
        <View style={styles.infoRow}>
          <View style={styles.infoBox}>
            <Text style={styles.label}>Vehicle Type</Text>
            <Text style={styles.value}>{vehicleType}</Text>
          </View>
          <View style={styles.infoBox}>
            <Text style={styles.label}>Fuel Type</Text>
            <Text style={styles.value}>{fuelType}</Text>
          </View>
        </View>
        <Text style={styles.capacityTitle}>Available Capacity</Text>
        <Text style={styles.capacityValue}>{availableFuelCapacity}L</Text>
      </View>

      <TextInput
        style={styles.inputBox}
        value={enteredFuelAmount}
        onChangeText={setEnteredFuelAmount}
        keyboardType="numeric"
        placeholder="Enter fuel amount"
        placeholderTextColor="#aaa"
      />

      <View style={styles.numpad}>
        {[["1", "2", "3"], ["4", "5", "6"], ["7", "8", "9"], ["0", ".", "DEL"]].map(
          (row, idx) => (
            <View style={styles.row} key={idx}>
              {row.map((item) => (
                <TouchableOpacity
                  key={item}
                  style={[
                    styles.numpadButton,
                    item === "DEL" && styles.deleteButton,
                  ]}
                  onPress={() =>
                    item === "DEL"
                      ? handleDelete()
                      : item === "."
                      ? handleDotPress()
                      : handleButtonPress(item)
                  }
                >
                  <Text style={styles.buttonText}>{item}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )
        )}
      </View>

      <View style={styles.actionRow}>
        <TouchableOpacity style={[styles.actionButton, styles.submit]} onPress={handleSubmit}>
          <Text style={styles.buttonText}>SUBMIT</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.actionButton, styles.cancel]} onPress={() => router.back()}>
          <Text style={styles.buttonText}>CANCEL</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#f2f2f2",
    alignItems: "center",
    flexGrow: 1,
  },
  card: {
    backgroundColor: "#fff",
    width: "100%",
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    elevation: 3,
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  plate: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#222",
    textAlign: "center",
    marginBottom: 20,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  infoBox: {
    width: "48%",
  },
  label: {
    fontSize: 16,
    color: "#555",
    marginBottom: 5,
  },
  value: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
  },
  capacityTitle: {
    fontSize: 16,
    marginTop: 10,
    color: "#555",
  },
  capacityValue: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000",
  },
  inputBox: {
    width: "100%",
    height: 50,
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 18,
    marginBottom: 20,
    borderColor: "#ccc",
    borderWidth: 1,
  },
  numpad: {
    width: "100%",
    marginBottom: 20,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  numpadButton: {
    flex: 1,
    height: 60,
    backgroundColor: "#0E7AFE",
    marginHorizontal: 5,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  deleteButton: {
    backgroundColor: "#e53935",
  },
  buttonText: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
  },
  actionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  actionButton: {
    flex: 1,
    height: 50,
    marginHorizontal: 5,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  submit: {
    backgroundColor: "#388e3c",
  },
  cancel: {
    backgroundColor: "#f57c00",
  },
});

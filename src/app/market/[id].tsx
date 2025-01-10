import React, { useEffect, useState, useRef } from "react";
import {
  Alert,
  View,
  Modal,
  StatusBar,
  ScrollView,
  RefreshControl,
} from "react-native";
import { useLocalSearchParams, Redirect } from "expo-router";

import { Loading } from "@/components/loading";

import { api } from "@/services/api";
import { Cover } from "@/components/market/cover";
import { Details, PropsDetails } from "@/components/market/details";
import { Coupon } from "@/components/market/cupon";
import { Button } from "@/components/Button";
import { useCameraPermissions, CameraView } from "expo-camera";

type DataProps = PropsDetails & {
  cover: string;
};

export default function Market() {
  const params = useLocalSearchParams<{ id: string }>();
  const [markets, setMarkets] = useState<DataProps>();
  const [isLoading, setIsLoading] = useState(true);
  const [coupon, setCoupon] = useState<string | null>(null);
  const [couponIsFetching, setCouponIsFetching] = useState(false);
  const [isVisibleCameraModal, setIsVisibleCameraModal] = useState(false);
  const [_, requestPermission] = useCameraPermissions();

  const qrLock = useRef(false);

  async function fetchMarket() {
    try {
      const { data } = await api.get(`/markets/${params.id}`);
      setMarkets(data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      Alert.alert("Error", "Não foi possivel carregar os dados");
    }
  }

  useEffect(() => {
    fetchMarket();
  }, [params.id, coupon]);

  if (isLoading) {
    return <Loading />;
  }

  if (!markets) {
    return <Redirect href={"/home"} />;
  }

  async function handleOpenCamera() {
    try {
      const { granted } = await requestPermission();

      if (!granted) {
        return Alert.alert("Camera", "Você precisa habilitar o uso da camera");
      }

      setIsVisibleCameraModal(true);
    } catch (error) {
      console.log("error", error);
      Alert.alert("Camera", "Não foi possivel utilizar a camera.");
    }
  }

  async function getCoupon(id: string) {
    try {
      setCouponIsFetching(true);

      const { data } = await api.patch("/coupons" + id);

      Alert.alert("Coupon", data.coupon);
      setCoupon(data.coupon);
    } catch (error) {
      console.log("Error", error);
    } finally {
      setCouponIsFetching(false);
    }
  }

  function handleUserCoupon(id: string) {
    setIsVisibleCameraModal(false);
    Alert.alert(
      "Cupom",
      "Não é possível reutilizar um cupom resgatado. Deseja Realmente resgatar o cupom",
      [
        { style: "cancel", text: "Nao" },
        { text: "Sim", onPress: () => getCoupon(id) },
      ]
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={false} onRefresh={() => fetchMarket()} />
        }
      >
        <Cover uri={markets?.cover} />

        <Details data={markets} />
        {coupon && <Coupon code="$FJHJJKHK#" />}

        <View style={{ padding: 32 }}>
          <Button onPress={handleOpenCamera}>
            <Button.Title>Ler QR Code</Button.Title>
          </Button>
        </View>
      </ScrollView>

      <Modal visible={isVisibleCameraModal} style={{ flex: 1 }}>
        <CameraView
          style={{ flex: 1 }}
          facing="back"
          onBarcodeScanned={({ data }) => {
            if (data && !qrLock.current) {
              qrLock.current = true;

              setTimeout(() => handleUserCoupon(data), 500);
            }
          }}
        />
        <View style={{ position: "absolute", bottom: 32, left: 32, right: 32 }}>
          <Button
            onPress={() => setIsVisibleCameraModal(false)}
            isLoading={couponIsFetching}
          >
            <Button.Title>Voltar</Button.Title>
          </Button>
        </View>
      </Modal>
    </View>
  );
}

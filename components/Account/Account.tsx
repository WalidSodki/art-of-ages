import { useState, useEffect } from "react";
import { StyleSheet, View, Alert, Button, Text, Image } from "react-native";
import { Session } from "@supabase/supabase-js";
import { supabase } from "../../lib/supabase";

interface Card {
  card_id: string;
  total_amount: number;
  cards: {
    id: string;
    title: string;
    image_url: string;
    artist: string;
    description: string;
  };
}
export default function Account({ session }: { session: Session }) {
  const [isLoading, setIsLoading] = useState(true);

  const [cards, setCards] = useState<Card[]>([]);

  useEffect(() => {
    if (session) getProfile();
  }, [session]);

  async function getProfile() {
    try {
      setIsLoading(true);
      if (!session?.user) throw new Error("No user on the session!");

      const { data, error, status } = await supabase
        .from("player_cards")
        .select(
          `
            card_id,
            total_amount,
            cards ( id, title, image_url, artist, description )`
        )
        .eq("user_id", session.user.id);
      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        setCards(data);
      }
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message);
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <View style={styles.container}>
      <View style={[styles.verticallySpaced, styles.mt20]}>
        <Text style={styles.text}>Welcome back {session?.user?.email}!</Text>
      </View>

      <View style={[styles.verticallySpaced, styles.mt20]}>
        {isLoading ? (
          <Text style={styles.text}>Loading...</Text>
        ) : (
          <View>
            {cards.map((card) => (
              <View key={card.card_id}>
                <Image
                  source={{ uri: card.cards.image_url }}
                  style={{ width: 80, height: 80 }}
                />
                <Text style={styles.text}>{card.total_amount}</Text>
                <Text style={styles.text}>{card.cards.title}</Text>
                <Text style={styles.text}>{card.cards.artist}</Text>
                <Text style={styles.text}>{card.cards.description}</Text>
              </View>
            ))}
          </View>
        )}
      </View>

      <View style={styles.verticallySpaced}>
        <Button title="Sign Out" onPress={() => supabase.auth.signOut()} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    padding: 12,
  },
  verticallySpaced: {
    paddingTop: 4,
    paddingBottom: 4,
    alignSelf: "stretch",
  },
  mt20: {
    marginTop: 20,
  },
  text: {
    color: "white",
  },
});

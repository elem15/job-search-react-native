import { View, Text, TouchableOpacity, Image, Linking } from "react-native";

import styles from "./footer.style";
import { icons } from "../../../constants";
import { useState } from 'react';

const Footer = ({ url }) => {

  const [isHeart, setIsHeart] = useState(false);
  return (
    <View style={styles.container}>
      <TouchableOpacity style={isHeart ? styles.likeBtnActive : styles.likeBtn} onPress={() => setIsHeart((prev) => !prev)}>
        <Image
          source={icons.heartOutline}
          resizeMode='contain'
          style={isHeart ? styles.likeBtnImageActive : styles.likeBtnImage}
        />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.applyBtn}
        onPress={() => Linking.openURL(url)}
      >
        <Text style={styles.applyBtnText}>Apply for job</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Footer;
/**
 * Onboarding Screen - First-time user introduction
 */

import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  FlatList,
  Animated,
  Image,
  ImageSourcePropType,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';
import { COLORS, SPACING, FONTS } from '../constants/theme';
import { useAppStore } from '../store/appStore';

const { width, height } = Dimensions.get('window');

interface OnboardingSlide {
  id: string;
  icon?: string;
  image?: ImageSourcePropType;
  title: string;
  description: string;
  color: string;
}

const SLIDES: OnboardingSlide[] = [
  {
    id: '1',
    icon: 'shield-home',
    title: 'Welcome to NOKK',
    description: 'Your personal home safety companion.\nFeel safe when you\'re home alone.',
    color: COLORS.primary,
  },
  {
    id: '2',
    image: require('../../assets/onboarding_home.png'),
    title: 'One Tap Safety',
    description: 'Play a protective voice instantly\nwhen strangers visit your door.',
    color: '#3d5a80',
  },
  {
    id: '3',
    image: require('../../assets/onboarding_phrases.png'),
    title: 'Various Phrases',
    description: 'Choose from dozens of situational phrases\nfor delivery, night, threats, and more.',
    color: '#2a9d8f',
  },
  {
    id: '4',
    image: require('../../assets/onboarding_customize.png'),
    title: 'Customize Quick Actions',
    description: 'Set your favorite phrases for\ninstant one-tap access.',
    color: '#e76f51',
  },
];

interface OnboardingScreenProps {
  onComplete: () => void;
}

export const OnboardingScreen: React.FC<OnboardingScreenProps> = ({ onComplete }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);
  const scrollX = useRef(new Animated.Value(0)).current;
  const isDarkMode = useAppStore(state => state.isDarkMode);
  const colors = isDarkMode ? COLORS.dark : COLORS.light;

  const handleNext = () => {
    if (currentIndex < SLIDES.length - 1) {
      flatListRef.current?.scrollToIndex({ index: currentIndex + 1 });
      setCurrentIndex(currentIndex + 1);
    } else {
      onComplete();
    }
  };

  const handleSkip = () => {
    onComplete();
  };

  const renderSlide = ({ item }: { item: OnboardingSlide }) => (
    <View style={[styles.slide, { width }]}>
      {item.image ? (
        <View style={styles.imageContainer}>
          <Image source={item.image} style={styles.slideImage} resizeMode="contain" />
        </View>
      ) : (
        <View style={[styles.iconContainer, { backgroundColor: item.color + '20' }]}>
          <Icon name={item.icon as any} size={80} color={item.color} />
        </View>
      )}
      <Text style={[styles.title, { color: colors.text }]}>{item.title}</Text>
      <Text style={[styles.description, { color: colors.textSecondary }]}>
        {item.description}
      </Text>
    </View>
  );

  const renderDots = () => (
    <View style={styles.dotsContainer}>
      {SLIDES.map((_, index) => {
        const inputRange = [(index - 1) * width, index * width, (index + 1) * width];
        const dotWidth = scrollX.interpolate({
          inputRange,
          outputRange: [8, 24, 8],
          extrapolate: 'clamp',
        });
        const opacity = scrollX.interpolate({
          inputRange,
          outputRange: [0.3, 1, 0.3],
          extrapolate: 'clamp',
        });

        return (
          <Animated.View
            key={index}
            style={[
              styles.dot,
              {
                width: dotWidth,
                opacity,
                backgroundColor: COLORS.primary,
              },
            ]}
          />
        );
      })}
    </View>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Skip Button */}
      <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
        <Text style={[styles.skipText, { color: colors.textSecondary }]}>Skip</Text>
      </TouchableOpacity>

      {/* Slides */}
      <Animated.FlatList
        ref={flatListRef}
        data={SLIDES}
        renderItem={renderSlide}
        keyExtractor={(item) => item.id}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false }
        )}
        onMomentumScrollEnd={(e) => {
          const index = Math.round(e.nativeEvent.contentOffset.x / width);
          setCurrentIndex(index);
        }}
        scrollEventThrottle={16}
      />

      {/* Dots */}
      {renderDots()}

      {/* Next/Get Started Button */}
      <TouchableOpacity
        style={[styles.nextButton, { backgroundColor: COLORS.primary }]}
        onPress={handleNext}
      >
        <Text style={styles.nextButtonText}>
          {currentIndex === SLIDES.length - 1 ? 'Get Started' : 'Next'}
        </Text>
        <Icon
          name={currentIndex === SLIDES.length - 1 ? 'check' : 'arrow-right'}
          size={20}
          color="#FFFFFF"
          style={{ marginLeft: 8 }}
        />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  skipButton: {
    position: 'absolute',
    top: 60,
    right: 20,
    zIndex: 1,
    padding: 10,
  },
  skipText: {
    fontSize: FONTS.sizes.md,
    fontWeight: '500',
  },
  slide: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: SPACING.xl,
  },
  iconContainer: {
    width: 160,
    height: 160,
    borderRadius: 80,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SPACING.xl,
  },
  imageContainer: {
    width: width * 0.75,
    height: height * 0.45,
    marginBottom: SPACING.lg,
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  slideImage: {
    width: '100%',
    height: '100%',
    borderRadius: 20,
  },
  title: {
    fontSize: FONTS.sizes.xxl,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: SPACING.md,
  },
  description: {
    fontSize: FONTS.sizes.md,
    textAlign: 'center',
    lineHeight: 24,
  },
  dotsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SPACING.xl,
  },
  dot: {
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  nextButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: SPACING.xl,
    marginBottom: SPACING.xl,
    paddingVertical: SPACING.md,
    borderRadius: 12,
  },
  nextButtonText: {
    color: '#FFFFFF',
    fontSize: FONTS.sizes.lg,
    fontWeight: '600',
  },
});

export default OnboardingScreen;

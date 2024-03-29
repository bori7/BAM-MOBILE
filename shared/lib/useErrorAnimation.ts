import { useEffect, useState } from 'react';
// import { FieldError } from 'react-hook-form';
import {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';

export const useErrorAnimation = (error: boolean ) => {
  const shakeValue = useSharedValue(0);

  const [errorAnimation, setErrorAnimation] = useState(error);

  const handleAnimation = () => {
    const handleRightAnimation = withRepeat(
      withTiming(6, {
        duration: 40,
        easing: Easing.exp,
      }),
      2,
      true,
    );
    const handleLeftAnimation = withRepeat(
      withTiming(-6, {
        duration: 30,
        easing: Easing.exp,
      }),
      2,
      true,
    );
    shakeValue.value = withSequence(
      handleRightAnimation,
      handleLeftAnimation,
      handleRightAnimation,
      handleLeftAnimation,
    );
  };

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: shakeValue.value }],
    };
  });

  useEffect(() => {
    setErrorAnimation(error);
  }, [error]);

  useEffect(() => {
    if (errorAnimation) {
      setTimeout(() => {
        handleAnimation();
      }, 100);
    }
  }, [errorAnimation]);

  return animatedStyle;
};

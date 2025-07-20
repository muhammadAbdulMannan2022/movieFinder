import { Tabs } from 'expo-router';
import { Image, Platform, View } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import Protected from '@/components/helpers/Protected';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { SafeAreaView } from 'react-native-safe-area-context';

const darkTabBarColor = '#111';
const darkActiveTint = '#42f56c';
const darkInactiveTint = '#888';

export default function TabLayout() {
  return (
    <View className='bg-black' style={{ flex: 1 }}>
      <Protected>
        <SafeAreaView className='flex-1'>
          {/* Shared header for all tabs */}
          <View
            className='items-center justify-center'
          >
            <Image className='h-12 w-30' source={require("@/assets/inAppLogo.png")} resizeMode='center' />
          </View>

          {/* Tabs take remaining space */}
          <Tabs
            screenOptions={{
              headerShown: false,
              tabBarButton: HapticTab,
              tabBarBackground: TabBarBackground,
              tabBarActiveTintColor: darkActiveTint,
              tabBarInactiveTintColor: darkInactiveTint,
              tabBarShowLabel: false,
              tabBarStyle: {
                backgroundColor: darkTabBarColor,
                borderTopWidth: 0,
                elevation: 0,
                height: 65,
                paddingBottom: Platform.OS === 'ios' ? 20 : 10,
                paddingTop: 10,
                position: 'absolute',
              },
              tabBarLabelStyle: {
                fontSize: 12,
              },
            }}
            style={{ flex: 1 }}
          >
            <Tabs.Screen
              name="index"
              options={{
                title: 'Home',
                tabBarIcon: ({ color }) => (
                  <IconSymbol size={30} name="house.fill" color={color} />
                ),
              }}
            />
            <Tabs.Screen
              name="search"
              options={{
                title: 'Search',
                tabBarIcon: ({ color }) => (
                  <IconSymbol size={30} name="magnifyingglass" color={color} />
                ),
              }}
            />
            <Tabs.Screen
              name="favorites"
              options={{
                title: 'Favorites',
                tabBarIcon: ({ color }) => (
                  <IconSymbol size={30} name="heart.fill" color={color} />
                ),
              }}
            />
            <Tabs.Screen
              name="settings"
              options={{
                title: 'Settings',
                tabBarIcon: ({ color }) => (
                  <IconSymbol size={30} name="gearshape.fill" color={color} />
                ),
              }}
            />
          </Tabs>
        </SafeAreaView>
      </Protected>
    </View>
  );
}

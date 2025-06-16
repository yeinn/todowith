import { View, ViewProps } from 'react-native'

const ScreenContainer = ({ children, ...props }: ViewProps) => {
  return (
    <View
      {...props}
      style={[
        {
          flex: 1,
          padding: 20,
          backgroundColor: 'white',
        },
        props.style,
      ]}
    >
      {children}
    </View>
  )
}

export default ScreenContainer

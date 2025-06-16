import { TouchableOpacity, Text, ViewStyle, TextStyle } from 'react-native'

type Props = {
  label: string
  onPress: () => void
  style?: ViewStyle
  textStyle?: TextStyle
}

const Button = ({ label, onPress, style, textStyle }: Props) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        {
          backgroundColor: '#007AFF',
          paddingVertical: 12,
          paddingHorizontal: 20,
          borderRadius: 8,
        },
        style,
      ]}
    >
      <Text style={[{ color: 'white', fontSize: 16, textAlign: 'center' }, textStyle]}>
        {label}
      </Text>
    </TouchableOpacity>
  )
}

export default Button

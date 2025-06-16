import { Text, View } from 'react-native'

type Props = {
  title: string
}

const Header = ({ title }: Props) => {
  return (
    <View style={{ paddingVertical: 12 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold' }}>{title}</Text>
    </View>
  )
}

export default Header
import { TextInput, TextInputProps, StyleSheet } from 'react-native'

const TextField = (props: TextInputProps) => {
  return <TextInput {...props} style={[styles.input, props.style]} />
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    padding: 10,
    fontSize: 16,
  },
})

export default TextField

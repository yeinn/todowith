import React, { useState } from 'react'
import { View, Text, TextInput, FlatList, TouchableOpacity } from 'react-native'
import { useRouter } from 'expo-router'
import { useTodoStore } from '@/lib/store/todo'
import Button from '@/components/ui/Button'
import TextField from '@/components/ui/TextField'
import ScreenContainer from '@/components/ui/ScreenContainer'
import Header from '@/components/ui/Header'


const TodoScreen: React.FC = () => {
  const [text, setText] = useState('')
  const router = useRouter()
  const { todos, addTodo, toggleTodo, removeTodo } = useTodoStore()

  return (
    <ScreenContainer>
      <Header title="📋 오늘의 할일" />
      <View style={{ flexDirection: 'row', marginBottom: 20 }}>
        <TextField
          value={text}
          onChangeText={setText}
          placeholder="할 일 입력"
          style={{ flex: 1, marginRight: 8 }}
        />
        <Button label="추가" onPress={() => { addTodo(text); setText('') }} />
      </View>

      <FlatList
        data={todos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => toggleTodo(item.id)} onLongPress={() => removeTodo(item.id)}>
            <Text style={{
              fontSize: 18,
              marginBottom: 12,
              textDecorationLine: item.completed ? 'line-through' : 'none'
            }}>
              {item.text}
            </Text>
          </TouchableOpacity>
        )}
      />

      <View style={{ position: 'absolute', bottom: 40, alignSelf: 'center' }}>
        <Button label="오늘 인증하기 📸" onPress={() => router.push('/camera')} />
      </View>
    </ScreenContainer>
  )
}

export default TodoScreen
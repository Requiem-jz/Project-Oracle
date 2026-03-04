import { View, Text, Input, Button, Picker } from '@tarojs/components'
import { useState, useCallback } from 'react'
import Taro from '@tarojs/taro'
import { useStore } from '@/store/useStore'
import type { FiveElement, ContractRole, Deadline, LegacyCode } from '@/utils/destinyEngine'
import './index.scss'

const TECH_FIVE_ELEMENTS: { label: string; value: FiveElement; desc: string }[] = [
  { label: '金·底层', value: '金', desc: '架构之道' },
  { label: '木·前端', value: '木', desc: '生长之力' },
  { label: '水·AI', value: '水', desc: '流动之韵' },
  { label: '火·游戏', value: '火', desc: '激情之焰' },
  { label: '土·后端', value: '土', desc: '稳重之基' }
]

const CONTRACT_ROLES: { label: string; value: ContractRole }[] = [
  { label: '甲方金主', value: '甲方金主' },
  { label: '乙方主力', value: '乙方主力' },
  { label: '丙丁外包', value: '丙丁外包' },
  { label: '独立自研', value: '独立自研' }
]

const DEADLINES: { label: string; value: Deadline }[] = [
  { label: '昨天就要', value: '昨天就要' },
  { label: '正常排期', value: '正常排期' },
  { label: '边做边看', value: '边做边看' }
]

const LEGACY_CODES: { label: string; value: LegacyCode }[] = [
  { label: '从零新建', value: '从零新建' },
  { label: '祖传屎山', value: '祖传屎山' }
]

export default function Index() {
  const [projectName, setProjectName] = useState('')
  const [techIndex, setTechIndex] = useState(0)
  const [roleIndex, setRoleIndex] = useState(0)
  const [deadlineIndex, setDeadlineIndex] = useState(0)
  const [legacyIndex, setLegacyIndex] = useState(0)
  
  const setPendingProject = useStore((state) => state.setPendingProject)

  const handleSubmit = useCallback(() => {
    if (!projectName.trim()) {
      Taro.showToast({
        title: '请输入项目代号',
        icon: 'none',
        duration: 2000
      })
      return
    }

    const projectInput = {
      name: projectName.trim(),
      techStack: [TECH_FIVE_ELEMENTS[techIndex].value],
      contractRole: CONTRACT_ROLES[roleIndex].value,
      deadline: DEADLINES[deadlineIndex].value,
      legacyCode: LEGACY_CODES[legacyIndex].value
    }

    setPendingProject(projectInput)

    Taro.navigateTo({
      url: '/pages/calculating/index'
    })
  }, [projectName, techIndex, roleIndex, deadlineIndex, legacyIndex, setPendingProject])

  return (
    <View className='min-h-screen bg-black px-6 py-8'>
      <View className='mb-10 pt-4'>
        <View className='flex items-center justify-center mb-3'>
          <View className='w-16 h-1 bg-gradient-to-r from-transparent to-green-400' />
          <Text className='mx-4 text-2xl font-bold text-green-400 tracking-widest'
            style={{ textShadow: '0 0 20px #4ade80, 0 0 40px #4ade80' }}>
            赛博排盘
          </Text>
          <View className='w-16 h-1 bg-gradient-to-l from-transparent to-green-400' />
        </View>
        <Text className='block text-center text-yellow-600 text-sm tracking-wider opacity-80'
          style={{ textShadow: '0 0 10px #ca8a04' }}>
          万物皆有代码，项目亦有命数
        </Text>
        <View className='mt-4 flex justify-center'>
          <View className='w-32 h-1 bg-yellow-600 opacity-50'
            style={{ boxShadow: '0 0 10px #ca8a04' }} />
        </View>
      </View>

      <View className='mb-6'>
        <View className='flex items-center mb-3'>
          <Text className='text-green-400 text-lg font-medium'
            style={{ textShadow: '0 0 10px #4ade80' }}>
            ▸ 项目代号
          </Text>
          <Text className='ml-2 text-red-400 text-xs'>*必填</Text>
        </View>
        <Input
          className='w-full h-12 px-4 bg-black border rounded-lg text-green-400'
          style={{ 
            borderColor: 'rgba(74, 222, 128, 0.5)',
            boxShadow: '0 0 15px rgba(74, 222, 128, 0.3), inset 0 0 20px rgba(74, 222, 128, 0.05)'
          }}
          placeholder='输入项目神秘代号...'
          placeholderStyle='color: rgba(74, 222, 128, 0.3)'
          value={projectName}
          onInput={(e) => setProjectName(e.detail.value)}
        />
      </View>

      <View className='mb-6'>
        <Text className='block text-green-400 text-lg font-medium mb-3'
          style={{ textShadow: '0 0 10px #4ade80' }}>
          ▸ 技术五行
        </Text>
        <Picker
          mode='selector'
          range={TECH_FIVE_ELEMENTS.map(item => item.label)}
          value={techIndex}
          onChange={(e) => setTechIndex(Number(e.detail.value))}
        >
          <View 
            className='w-full h-12 px-4 bg-black border rounded-lg flex items-center justify-between'
            style={{ 
              borderColor: 'rgba(202, 138, 4, 0.5)',
              boxShadow: '0 0 15px rgba(202, 138, 4, 0.3), inset 0 0 20px rgba(202, 138, 4, 0.05)'
            }}
          >
            <Text className='text-yellow-600'>{TECH_FIVE_ELEMENTS[techIndex].label}</Text>
            <Text className='text-xl' style={{ color: 'rgba(202, 138, 4, 0.6)' }}>▼</Text>
          </View>
        </Picker>
        <Text className='block text-xs mt-2 ml-1' style={{ color: 'rgba(202, 138, 4, 0.5)' }}>
          {TECH_FIVE_ELEMENTS[techIndex].desc}
        </Text>
      </View>

      <View className='mb-6'>
        <Text className='block text-green-400 text-lg font-medium mb-3'
          style={{ textShadow: '0 0 10px #4ade80' }}>
          ▸ 商业身位
        </Text>
        <Picker
          mode='selector'
          range={CONTRACT_ROLES.map(item => item.label)}
          value={roleIndex}
          onChange={(e) => setRoleIndex(Number(e.detail.value))}
        >
          <View 
            className='w-full h-12 px-4 bg-black border rounded-lg flex items-center justify-between'
            style={{ 
              borderColor: 'rgba(74, 222, 128, 0.5)',
              boxShadow: '0 0 15px rgba(74, 222, 128, 0.3), inset 0 0 20px rgba(74, 222, 128, 0.05)'
            }}
          >
            <Text className='text-green-400'>{CONTRACT_ROLES[roleIndex].label}</Text>
            <Text className='text-xl' style={{ color: 'rgba(74, 222, 128, 0.6)' }}>▼</Text>
          </View>
        </Picker>
      </View>

      <View className='mb-6'>
        <Text className='block text-green-400 text-lg font-medium mb-3'
          style={{ textShadow: '0 0 10px #4ade80' }}>
          ▸ 寿元气数
        </Text>
        <Picker
          mode='selector'
          range={DEADLINES.map(item => item.label)}
          value={deadlineIndex}
          onChange={(e) => setDeadlineIndex(Number(e.detail.value))}
        >
          <View 
            className='w-full h-12 px-4 bg-black border rounded-lg flex items-center justify-between'
            style={{ 
              borderColor: 'rgba(202, 138, 4, 0.5)',
              boxShadow: '0 0 15px rgba(202, 138, 4, 0.3), inset 0 0 20px rgba(202, 138, 4, 0.05)'
            }}
          >
            <Text className='text-yellow-600'>{DEADLINES[deadlineIndex].label}</Text>
            <Text className='text-xl' style={{ color: 'rgba(202, 138, 4, 0.6)' }}>▼</Text>
          </View>
        </Picker>
      </View>

      <View className='mb-10'>
        <Text className='block text-green-400 text-lg font-medium mb-3'
          style={{ textShadow: '0 0 10px #4ade80' }}>
          ▸ 前世因果
        </Text>
        <Picker
          mode='selector'
          range={LEGACY_CODES.map(item => item.label)}
          value={legacyIndex}
          onChange={(e) => setLegacyIndex(Number(e.detail.value))}
        >
          <View 
            className='w-full h-12 px-4 bg-black border rounded-lg flex items-center justify-between'
            style={{ 
              borderColor: 'rgba(74, 222, 128, 0.5)',
              boxShadow: '0 0 15px rgba(74, 222, 128, 0.3), inset 0 0 20px rgba(74, 222, 128, 0.05)'
            }}
          >
            <Text className='text-green-400'>{LEGACY_CODES[legacyIndex].label}</Text>
            <Text className='text-xl' style={{ color: 'rgba(74, 222, 128, 0.6)' }}>▼</Text>
          </View>
        </Picker>
      </View>

      <Button
        className='w-full h-14 bg-black border-2 border-green-400 rounded-lg text-green-400 text-lg font-bold tracking-widest'
        style={{ 
          boxShadow: '0 0 30px rgba(74, 222, 128, 0.6), 0 0 60px rgba(74, 222, 128, 0.3), inset 0 0 30px rgba(74, 222, 128, 0.1)',
          textShadow: '0 0 10px #4ade80'
        }}
        hoverStyle={{
          boxShadow: '0 0 40px rgba(74, 222, 128, 0.8), 0 0 80px rgba(74, 222, 128, 0.4), inset 0 0 40px rgba(74, 222, 128, 0.2)',
          transform: 'scale(1.02)'
        }}
        onClick={handleSubmit}
      >
        ⚡ 注入天机，开坛推演 ⚡
      </Button>

      <View className='mt-8 flex justify-center'>
        <View className='flex items-center space-x-2 opacity-40'>
          <View className='w-2 h-2 bg-green-400 rounded-full animate-pulse' />
          <Text className='text-green-400 text-xs tracking-wider'>
            天机运算中...
          </Text>
          <View className='w-2 h-2 bg-green-400 rounded-full animate-pulse' />
        </View>
      </View>

      <View className='mt-6 flex justify-center'>
        <Text 
          className='text-sm underline'
          style={{ color: 'rgba(202, 138, 4, 0.6)' }}
          onClick={() => Taro.navigateTo({ url: '/pages/portfolio/index' })}
        >
          查看我的命盘图鉴 →
        </Text>
      </View>
    </View>
  )
}

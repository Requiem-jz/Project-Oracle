import { View, Text, ScrollView } from '@tarojs/components'
import { useEffect, useMemo } from 'react'
import Taro from '@tarojs/taro'
import { useStore, initializeStore, Project } from '@/store/useStore'
import { calculateUserStatus, ProjectResult } from '@/utils/destinyEngine'
import './index.scss'

export default function Portfolio() {
  const projects = useStore((state) => state.projects)
  const isLoading = useStore((state) => state.isLoading)

  useEffect(() => {
    initializeStore()
  }, [])

  const userStatus = useMemo(() => {
    const projectResults: ProjectResult[] = projects.map((p) => p.result)
    
    if (projectResults.length === 0 && projects.length > 0) {
      return {
        title: '职场萌新',
        description: '你的项目测算之旅才刚刚开始，命运的大门正在缓缓打开。',
        socialMatch: '随缘吧' as const
      }
    }
    
    return calculateUserStatus(projectResults)
  }, [projects])

  const truncateText = (text: string, maxLength: number = 20): string => {
    if (!text) return ''
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text
  }

  const getSocialMatchColor = (match: string): string => {
    switch (match) {
      case '宜结缘':
      case '宜合伙':
        return '#4ade80'
      case '忌合伙':
      case '忌结缘':
        return '#ff3366'
      default:
        return '#9ca3af'
    }
  }

  if (isLoading) {
    return (
      <View className='min-h-screen bg-black flex items-center justify-center'>
        <Text className='text-lg text-green-400 drop-shadow-glow-green'>
          加载命盘中...
        </Text>
      </View>
    )
  }

  return (
    <View className='min-h-screen bg-black'>
      <ScrollView scrollY className='h-screen pb-24'>
        <View className='p-6'>
          <View 
            className='mb-8 p-6 rounded-lg shadow-glow-gold'
            style={{
              background: 'linear-gradient(180deg, rgba(30, 30, 30, 0.9) 0%, rgba(10, 10, 10, 0.95) 100%)',
              border: '1px solid rgba(255, 215, 0, 0.3)'
            }}
          >
            <Text className='block text-center mb-2 text-sm text-yellow-500 opacity-60'>
              造物主境界
            </Text>
            
            <Text className='block text-center text-2xl font-bold mb-4 text-yellow-400 drop-shadow-glow-gold'>
              『{userStatus.title}』
            </Text>
            
            <Text 
              className='block text-center text-sm mb-4 px-4 text-gray-400'
              style={{ lineHeight: '1.6' }}
            >
              {userStatus.description}
            </Text>
            
            <View 
              className='flex justify-center pt-3'
              style={{ borderTop: '1px solid rgba(255, 215, 0, 0.2)' }}
            >
              <Text 
                className='text-sm'
                style={{ 
                  color: getSocialMatchColor(userStatus.socialMatch),
                  textShadow: `0 0 8px ${getSocialMatchColor(userStatus.socialMatch)}`
                }}
              >
                {userStatus.socialMatch}
              </Text>
            </View>
          </View>

          <View className='flex items-center justify-between mb-4'>
            <Text className='text-lg font-bold text-white drop-shadow-glow-white'>
              项目图鉴
            </Text>
            <Text className='text-sm text-gray-500'>
              共 {projects.length} 个
            </Text>
          </View>

          {projects.length === 0 ? (
            <View 
              className='p-8 rounded-lg text-center'
              style={{
                backgroundColor: 'rgba(30, 30, 30, 0.5)',
                border: '1px solid rgba(74, 222, 128, 0.2)'
              }}
            >
              <Text className='text-4xl block mb-4'>🔮</Text>
              <Text className='text-sm text-gray-500'>
                暂无项目，开始你的第一次推演吧
              </Text>
            </View>
          ) : (
            <View className='grid grid-cols-2 gap-4'>
              {projects.map((project) => {
                const result = project.result

                return (
                  <View
                    key={project.id}
                    className='p-4 rounded-lg shadow-card'
                    style={{
                      backgroundColor: 'rgba(20, 20, 20, 0.8)',
                      border: '1px solid rgba(74, 222, 128, 0.2)'
                    }}
                    onClick={() => {
                      Taro.showModal({
                        title: project.name,
                        content: `命格: ${result?.destinyName || '未知'}\n\n${result?.comment || ''}`,
                        showCancel: false
                      })
                    }}
                  >
                    <Text className='block text-base font-bold mb-2 truncate text-white drop-shadow-glow-white-weak'>
                      {project.name}
                    </Text>
                    
                    <Text className='block text-sm mb-2 text-green-400 drop-shadow-glow-green'>
                      {project.result?.destinyName || '凡人项目'}
                    </Text>
                    
                    <Text 
                      className='block text-xs text-gray-500'
                      style={{ lineHeight: '1.5' }}
                    >
                      {truncateText(project.result?.comment || '', 20)}
                    </Text>
                  </View>
                )
              })}
            </View>
          )}
        </View>
      </ScrollView>

      <View 
        className='fixed bottom-0 left-0 right-0 p-4'
        style={{
          backgroundColor: 'rgba(0, 0, 0, 0.95)',
          borderTop: '1px solid rgba(74, 222, 128, 0.3)'
        }}
      >
        <View
          className='py-4 rounded-lg text-center shadow-bottom-btn'
          style={{
            background: 'linear-gradient(135deg, rgba(74, 222, 128, 0.2) 0%, rgba(34, 197, 94, 0.3) 100%)',
            border: '1px solid rgba(74, 222, 128, 0.5)'
          }}
          onClick={() => Taro.reLaunch({ url: '/pages/index/index' })}
        >
          <Text className='text-base font-bold text-green-400 drop-shadow-glow-green-strong'>
            🔮 继续开坛 (测算新项目)
          </Text>
        </View>
      </View>
    </View>
  )
}

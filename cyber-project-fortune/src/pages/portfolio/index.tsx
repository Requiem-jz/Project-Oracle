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
    const projectResults: ProjectResult[] = projects
      .filter((p): p is Project & { result: ProjectResult } => p.result !== undefined)
      .map((p) => p.result)
    
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
        <Text 
          className='text-lg'
          style={{ 
            color: '#4ade80',
            textShadow: '0 0 10px rgba(74, 222, 128, 0.5)'
          }}
        >
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
            className='mb-8 p-6 rounded-lg'
            style={{
              background: 'linear-gradient(180deg, rgba(30, 30, 30, 0.9) 0%, rgba(10, 10, 10, 0.95) 100%)',
              border: '1px solid rgba(255, 215, 0, 0.3)',
              boxShadow: '0 0 30px rgba(255, 215, 0, 0.1), inset 0 0 20px rgba(255, 215, 0, 0.05)'
            }}
          >
            <Text 
              className='block text-center mb-2 text-sm'
              style={{ color: 'rgba(255, 215, 0, 0.6)' }}
            >
              造物主境界
            </Text>
            
            <Text 
              className='block text-center text-2xl font-bold mb-4'
              style={{ 
                color: '#ffd700',
                textShadow: '0 0 20px rgba(255, 215, 0, 0.8), 0 0 40px rgba(255, 215, 0, 0.4)'
              }}
            >
              『{userStatus.title}』
            </Text>
            
            <Text 
              className='block text-center text-sm mb-4 px-4'
              style={{ color: '#9ca3af', lineHeight: '1.6' }}
            >
              {userStatus.description}
            </Text>
            
            <View 
              className='flex justify-center'
              style={{
                paddingTop: '12px',
                borderTop: '1px solid rgba(255, 215, 0, 0.2)'
              }}
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
            <Text 
              className='text-lg font-bold'
              style={{ 
                color: '#ffffff',
                textShadow: '0 0 10px rgba(255, 255, 255, 0.3)'
              }}
            >
              项目图鉴
            </Text>
            <Text 
              className='text-sm'
              style={{ color: '#6b7280' }}
            >
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
              <Text 
                className='text-sm'
                style={{ color: '#6b7280' }}
              >
                暂无项目，开始你的第一次推演吧
              </Text>
            </View>
          ) : (
            <View className='grid grid-cols-2 gap-4'>
              {projects.map((project) => (
                <View
                  key={project.id}
                  className='p-4 rounded-lg'
                  style={{
                    backgroundColor: 'rgba(20, 20, 20, 0.8)',
                    border: '1px solid rgba(74, 222, 128, 0.2)',
                    boxShadow: 'inset 0 0 15px rgba(0, 0, 0, 0.5), 0 0 10px rgba(74, 222, 128, 0.1)'
                  }}
                  onClick={() => {
                    Taro.showModal({
                      title: project.name,
                      content: `命格: ${project.hexagram || '未知'}\n\n${project.divination || project.description}`,
                      showCancel: false
                    })
                  }}
                >
                  <Text 
                    className='block text-base font-bold mb-2 truncate'
                    style={{ 
                      color: '#ffffff',
                      textShadow: '0 0 5px rgba(255, 255, 255, 0.2)'
                    }}
                  >
                    {project.name}
                  </Text>
                  
                  <Text 
                    className='block text-sm mb-2'
                    style={{ 
                      color: '#4ade80',
                      textShadow: '0 0 8px rgba(74, 222, 128, 0.5)'
                    }}
                  >
                    {project.hexagram || '凡人项目'}
                  </Text>
                  
                  <Text 
                    className='block text-xs'
                    style={{ 
                      color: '#6b7280',
                      lineHeight: '1.5'
                    }}
                  >
                    {truncateText(project.divination || project.description, 20)}
                  </Text>
                </View>
              ))}
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
          className='py-4 rounded-lg text-center'
          style={{
            background: 'linear-gradient(135deg, rgba(74, 222, 128, 0.2) 0%, rgba(34, 197, 94, 0.3) 100%)',
            border: '1px solid rgba(74, 222, 128, 0.5)',
            boxShadow: '0 0 20px rgba(74, 222, 128, 0.3), inset 0 0 15px rgba(74, 222, 128, 0.1)'
          }}
          onClick={() => Taro.reLaunch({ url: '/pages/index/index' })}
        >
          <Text 
            className='text-base font-bold'
            style={{ 
              color: '#4ade80',
              textShadow: '0 0 10px rgba(74, 222, 128, 0.8)'
            }}
          >
            🔮 继续开坛 (测算新项目)
          </Text>
        </View>
      </View>
    </View>
  )
}

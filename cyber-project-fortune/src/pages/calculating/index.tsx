import { View, Text } from '@tarojs/components'
import { useEffect, useState, useCallback } from 'react'
import Taro from '@tarojs/taro'
import { useStore } from '@/store/useStore'
import { calculateProjectDestiny, ProjectResult } from '@/utils/destinyEngine'
import './index.scss'

interface LogLine {
  id: number
  text: string
  progress: number
}

const LOG_SEQUENCE: Array<{ progress: number; text: string }> = [
  { progress: 10, text: '正在解析前世业障...' },
  { progress: 45, text: '发现祖传屎山代码...' },
  { progress: 80, text: '正在召唤防背锅结界...' },
  { progress: 100, text: '命格锁定，天机已泄！' }
]

export default function Calculating() {
  const [logs, setLogs] = useState<LogLine[]>([])
  const [isComplete, setIsComplete] = useState(false)
  
  const pendingProject = useStore((state) => state.pendingProject)
  const addProject = useStore((state) => state.addProject)
  const setPendingProject = useStore((state) => state.setPendingProject)

  const saveResultAndNavigate = useCallback((result: ProjectResult) => {
    addProject({
      name: result.input.name,
      description: result.comment,
      techStack: result.input.techStack,
      status: 'developing',
      fortune: {
        overall: Math.round((result.stats.搞钱运 + result.stats.代码风水) / 2),
        tech: result.stats.代码风水,
        team: 100 - result.stats.背锅率,
        timing: 100 - result.stats.跳票率
      },
      hexagram: result.destinyName,
      divination: result.comment,
      result: result
    })
    
    setPendingProject(null)
    
    setTimeout(() => {
      Taro.redirectTo({ url: '/pages/portfolio/index' })
    }, 500)
  }, [addProject, setPendingProject])

  useEffect(() => {
    if (!pendingProject) {
      Taro.redirectTo({ url: '/pages/index/index' })
      return
    }

    let logIndex = 0
    let result: ProjectResult | null = null

    const showNextLog = () => {
      if (logIndex >= LOG_SEQUENCE.length) {
        setIsComplete(true)
        if (result) {
          saveResultAndNavigate(result)
        }
        return
      }

      const logData = LOG_SEQUENCE[logIndex]
      setLogs((prev) => [
        ...prev,
        { id: Date.now() + logIndex, text: logData.text, progress: logData.progress }
      ])

      if (logData.progress === 100) {
        result = calculateProjectDestiny(pendingProject)
      }

      logIndex++
      
      if (logIndex < LOG_SEQUENCE.length) {
        setTimeout(showNextLog, 600)
      } else {
        setTimeout(() => {
          setIsComplete(true)
          if (result) {
            saveResultAndNavigate(result)
          }
        }, 600)
      }
    }

    const timer = setTimeout(showNextLog, 300)

    return () => {
      clearTimeout(timer)
    }
  }, [pendingProject, saveResultAndNavigate])

  return (
    <View className='min-h-screen bg-black flex flex-col items-center justify-center p-6'>
      <View 
        className='w-full max-w-md'
        style={{
          backgroundColor: 'rgba(0, 0, 0, 0.9)',
          border: '1px solid rgba(74, 222, 128, 0.3)',
          borderRadius: '8px',
          padding: '24px',
          boxShadow: '0 0 30px rgba(74, 222, 128, 0.1), inset 0 0 20px rgba(74, 222, 128, 0.05)'
        }}
      >
        <View className='flex items-center mb-6'>
          <View 
            className='w-3 h-3 rounded-full mr-2'
            style={{ backgroundColor: '#ff5f56' }}
          />
          <View 
            className='w-3 h-3 rounded-full mr-2'
            style={{ backgroundColor: '#ffbd2e' }}
          />
          <View 
            className='w-3 h-3 rounded-full'
            style={{ backgroundColor: '#27ca40' }}
          />
          <Text 
            className='ml-4 text-sm'
            style={{ color: 'rgba(74, 222, 128, 0.6)' }}
          >
            destiny_terminal
          </Text>
        </View>

        <View className='min-h-48'>
          {logs.map((log, index) => (
            <View key={log.id} className='flex items-start mb-3'>
              <Text 
                className='mr-2 text-sm'
                style={{ 
                  color: log.progress === 100 ? '#ffd700' : '#4ade80',
                  textShadow: log.progress === 100 
                    ? '0 0 10px rgba(255, 215, 0, 0.8)' 
                    : '0 0 8px rgba(74, 222, 128, 0.6)'
                }}
              >
                [{log.progress}%]
              </Text>
              <Text 
                className='text-sm flex-1'
                style={{ 
                  color: log.progress === 100 ? '#ffd700' : '#4ade80',
                  textShadow: log.progress === 100 
                    ? '0 0 10px rgba(255, 215, 0, 0.8)' 
                    : '0 0 8px rgba(74, 222, 128, 0.6)'
                }}
              >
                {log.text}
              </Text>
            </View>
          ))}
          
          {!isComplete && logs.length > 0 && (
            <View className='flex items-center'>
              <Text 
                className='text-sm'
                style={{ 
                  color: '#4ade80',
                  animation: 'blink 1s infinite'
                }}
              >
                _
              </Text>
            </View>
          )}
        </View>

        {isComplete && (
          <View 
            className='mt-6 pt-4'
            style={{ borderTop: '1px solid rgba(74, 222, 128, 0.2)' }}
          >
            <Text 
              className='text-sm block text-center'
              style={{ 
                color: 'rgba(74, 222, 128, 0.6)',
                textShadow: '0 0 5px rgba(74, 222, 128, 0.3)'
              }}
            >
              正在跳转至命盘...
            </Text>
          </View>
        )}
      </View>

      <View className='mt-8'>
        <Text 
          className='text-xs'
          style={{ color: 'rgba(74, 222, 128, 0.3)' }}
        >
          CYBER DESTINY ENGINE v4.0.7
        </Text>
      </View>
    </View>
  )
}

import { create } from 'zustand'
import Taro from '@tarojs/taro'
import type { ProjectInput, ProjectResult } from '@/utils/destinyEngine'

export interface Project {
  id: string
  name: string
  description: string
  techStack: string[]
  status: 'planning' | 'developing' | 'completed' | 'archived'
  createdAt: number
  updatedAt: number
  fortune: {
    overall: number
    tech: number
    team: number
    timing: number
  }
  hexagram?: string
  divination?: string
  result?: ProjectResult
}

export interface CreatorRealm {
  level: number
  title: string
  experience: number
  totalProjects: number
  completedProjects: number
}

interface StoreState {
  projects: Project[]
  creatorRealm: CreatorRealm
  isLoading: boolean
  currentProject: Project | null
  pendingProject: ProjectInput | null
  
  addProject: (project: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>) => void
  updateProject: (id: string, updates: Partial<Project>) => void
  deleteProject: (id: string) => void
  setCurrentProject: (project: Project | null) => void
  setPendingProject: (input: ProjectInput | null) => void
  setLoading: (loading: boolean) => void
  loadFromStorage: () => Promise<void>
  saveToStorage: () => Promise<void>
  updateCreatorRealm: () => void
}

const STORAGE_KEYS = {
  PROJECTS: 'cyber_fortune_projects',
  CREATOR_REALM: 'cyber_fortune_creator_realm'
}

const DEFAULT_CREATOR_REALM: CreatorRealm = {
  level: 1,
  title: '初入江湖',
  experience: 0,
  totalProjects: 0,
  completedProjects: 0
}

const REALM_TITLES = [
  '初入江湖',
  '略有小成',
  '登堂入室',
  '炉火纯青',
  '出神入化',
  '登峰造极',
  '返璞归真',
  '天人合一',
  '造物之主',
  '赛博神仙'
]

const generateId = (): string => {
  return `project_${Date.now()}_${Math.random().toString(36).substring(2, 11)}`
}

export const useStore = create<StoreState>((set, get) => ({
  projects: [],
  creatorRealm: DEFAULT_CREATOR_REALM,
  isLoading: false,
  currentProject: null,
  pendingProject: null,

  addProject: (projectData) => {
    const now = Date.now()
    const newProject: Project = {
      ...projectData,
      id: generateId(),
      createdAt: now,
      updatedAt: now
    }
    
    set((state) => {
      const newProjects = [...state.projects, newProject]
      return { 
        projects: newProjects,
        currentProject: newProject
      }
    })
    
    get().saveToStorage()
    get().updateCreatorRealm()
  },

  updateProject: (id, updates) => {
    set((state) => {
      const newProjects = state.projects.map((project) =>
        project.id === id
          ? { ...project, ...updates, updatedAt: Date.now() }
          : project
      )
      const updatedCurrentProject = state.currentProject?.id === id
        ? { ...state.currentProject, ...updates, updatedAt: Date.now() }
        : state.currentProject
      
      return { 
        projects: newProjects,
        currentProject: updatedCurrentProject
      }
    })
    
    get().saveToStorage()
    get().updateCreatorRealm()
  },

  deleteProject: (id) => {
    set((state) => ({
      projects: state.projects.filter((project) => project.id !== id),
      currentProject: state.currentProject?.id === id ? null : state.currentProject
    }))
    
    get().saveToStorage()
    get().updateCreatorRealm()
  },

  setCurrentProject: (project) => {
    set({ currentProject: project })
  },

  setPendingProject: (input) => {
    set({ pendingProject: input })
  },

  setLoading: (loading) => {
    set({ isLoading: loading })
  },

  loadFromStorage: async () => {
    try {
      set({ isLoading: true })
      
      const projectsData = Taro.getStorageSync(STORAGE_KEYS.PROJECTS) as string | undefined
      const realmData = Taro.getStorageSync(STORAGE_KEYS.CREATOR_REALM) as string | undefined
      
      const projects: Project[] = projectsData ? JSON.parse(projectsData) : []
      const creatorRealm: CreatorRealm = realmData 
        ? JSON.parse(realmData) 
        : DEFAULT_CREATOR_REALM
      
      set({ 
        projects, 
        creatorRealm,
        isLoading: false 
      })
    } catch (error) {
      console.error('Failed to load from storage:', error)
      set({ 
        projects: [], 
        creatorRealm: DEFAULT_CREATOR_REALM,
        isLoading: false 
      })
    }
  },

  saveToStorage: async () => {
    try {
      const { projects, creatorRealm } = get()
      
      await Promise.all([
        Taro.setStorageSync(STORAGE_KEYS.PROJECTS, JSON.stringify(projects)),
        Taro.setStorageSync(STORAGE_KEYS.CREATOR_REALM, JSON.stringify(creatorRealm))
      ])
    } catch (error) {
      console.error('Failed to save to storage:', error)
    }
  },

  updateCreatorRealm: () => {
    set((state) => {
      const { projects } = state
      const totalProjects = projects.length
      const completedProjects = projects.filter(
        (p) => p.status === 'completed'
      ).length
      
      const experience = totalProjects * 10 + completedProjects * 50
      const level = Math.min(Math.floor(experience / 100) + 1, 10)
      const title = REALM_TITLES[level - 1] || REALM_TITLES[0]
      
      return {
        creatorRealm: {
          level,
          title,
          experience,
          totalProjects,
          completedProjects
        }
      }
    })
    
    get().saveToStorage()
  }
}))

export const initializeStore = async () => {
  await useStore.getState().loadFromStorage()
}

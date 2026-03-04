export type FiveElement = '金' | '木' | '水' | '火' | '土'

export type ContractRole = '甲方金主' | '乙方主力' | '丙丁外包' | '独立自研'

export type Deadline = '昨天就要' | '正常排期' | '边做边看'

export type LegacyCode = '从零新建' | '祖传屎山'

export interface ProjectInput {
  name: string
  techStack: FiveElement[]
  contractRole: ContractRole
  deadline: Deadline
  legacyCode: LegacyCode
}

export interface ProjectStats {
  搞钱运: number
  背锅率: number
  脱发度: number
  代码风水: number
  跳票率: number
}

export interface ProjectResult {
  id: string
  input: ProjectInput
  stats: ProjectStats
  destinyName: string
  comment: string
}

export interface UserStatus {
  title: string
  description: string
  socialMatch: '宜结缘' | '忌合伙' | '宜合伙' | '忌结缘' | '随缘吧'
}

interface DestinyRule {
  name: string
  condition: (stats: ProjectStats, input: ProjectInput) => boolean
  comment: string
}

interface UserRealmRule {
  title: string
  condition: (projects: ProjectResult[]) => boolean
  description: string
  socialMatch: UserStatus['socialMatch']
}

const FIVE_ELEMENT_BONUS: Record<FiveElement, Partial<ProjectStats>> = {
  '金': { 搞钱运: 15, 代码风水: 10 },
  '木': { 代码风水: 15, 跳票率: -10 },
  '水': { 跳票率: 15, 搞钱运: -5 },
  '火': { 脱发度: 20, 背锅率: 10 },
  '土': { 背锅率: -10, 代码风水: 5 }
}

const CONTRACT_ROLE_MODIFIER: Record<ContractRole, Partial<ProjectStats>> = {
  '甲方金主': { 搞钱运: 30, 背锅率: -20, 跳票率: 20 },
  '乙方主力': { 搞钱运: 10, 背锅率: 20, 脱发度: 15 },
  '丙丁外包': { 搞钱运: -10, 背锅率: 40, 脱发度: 25, 代码风水: -20 },
  '独立自研': { 搞钱运: -20, 背锅率: -30, 代码风水: 20, 跳票率: -10 }
}

const DEADLINE_MODIFIER: Record<Deadline, Partial<ProjectStats>> = {
  '昨天就要': { 脱发度: 35, 跳票率: 30, 代码风水: -25, 背锅率: 20 },
  '正常排期': { 代码风水: 10, 跳票率: -10 },
  '边做边看': { 跳票率: 25, 搞钱运: -10, 背锅率: -10 }
}

const LEGACY_CODE_MODIFIER: Record<LegacyCode, Partial<ProjectStats>> = {
  '从零新建': { 代码风水: 25, 脱发度: -15, 背锅率: -15 },
  '祖传屎山': { 
    代码风水: -40, 
    脱发度: 45, 
    背锅率: 35, 
    跳票率: 20,
    搞钱运: -15 
  }
}

const DESTINY_RULES: DestinyRule[] = [
  {
    name: '天选打工人',
    condition: (stats, input) => 
      stats.背锅率 >= 80 && stats.脱发度 >= 75 && input.contractRole === '丙丁外包',
    comment: '此命格乃职场天选之材，背锅与脱发双修，外包界的扛把子。建议常备生发液与甩锅指南，此乃生存之道。记住：锅从天降，发随风去，唯有工资卡余额是真爱。'
  },
  {
    name: '赛博赌徒',
    condition: (stats, input) => 
      stats.跳票率 >= 70 && stats.搞钱运 >= 60 && input.deadline === '边做边看',
    comment: '项目排期全靠玄学，上线时间随缘而定。此命格者，适合创业圈摸鱼，大厂里混日子。建议多拜拜产品经理，少惹测试大佬，毕竟跳票多了，人品也会跳票。'
  },
  {
    name: '代码风水师',
    condition: (stats) => 
      stats.代码风水 >= 75 && stats.脱发度 <= 40,
    comment: '代码写得如诗如画，架构设计堪比风水宝地。此命格者，乃团队之福星，技术之栋梁。可惜搞钱运往往一般，建议适当摸鱼，提升一下世俗欲望。'
  },
  {
    name: '带薪修仙者',
    condition: (stats, input) => 
      stats.背锅率 <= 30 && stats.脱发度 <= 35 && input.contractRole === '甲方金主',
    comment: '甲方爸爸的命格，背锅率极低，脱发度感人。此乃职场修仙之最高境界，建议多结善缘，少压榨乙方，毕竟风水轮流转，明年到谁家还未可知。'
  },
  {
    name: '屎山攀登者',
    condition: (stats, input) => 
      stats.代码风水 <= 30 && input.legacyCode === '祖传屎山',
    comment: '在屎山代码中摸爬滚打，练就一身绝世武功。此命格者，抗压能力MAX，建议多写文档少抱怨，毕竟这坨屎山，可能就是你自己当年拉的。'
  },
  {
    name: '跳票艺术家',
    condition: (stats) => 
      stats.跳票率 >= 80,
    comment: '项目延期是常态，按时上线是意外。此命格者，建议转行做产品经理，毕竟画饼比写代码更擅长。记住：跳票不可怕，可怕的是连借口都懒得找。'
  },
  {
    name: '搞钱机器',
    condition: (stats) => 
      stats.搞钱运 >= 80 && stats.背锅率 <= 40,
    comment: '此命格者，乃职场赢家，搞钱能力一流，背锅能力三流。建议多请同事吃饭，毕竟钱多了容易没朋友。记住：搞钱虽好，但发际线更重要。'
  },
  {
    name: '职场天坑',
    condition: (stats) => 
      stats.背锅率 >= 70 && stats.脱发度 >= 70 && stats.搞钱运 <= 30,
    comment: '此乃职场最惨命格，锅你背、发你掉、钱别人拿。建议立即更新简历，或者考虑转行卖煎饼果子。记住：天坑不可怕，可怕的是你还在坑里躺平。'
  }
]

const USER_REALM_RULES: UserRealmRule[] = [
  {
    title: '赛博救火队长',
    condition: (projects) => {
      const highBacklog = projects.filter(p => p.stats.背锅率 >= 70).length
      const highHairLoss = projects.filter(p => p.stats.脱发度 >= 70).length
      return highBacklog >= 3 || highHairLoss >= 3
    },
    description: '你的项目生涯就是一部救火史，哪里有锅哪里就有你的身影。建议常备灭火器（甩锅指南）和防毒面具（心理建设），毕竟火场无情，职场更无情。',
    socialMatch: '忌合伙'
  },
  {
    title: '化外散仙',
    condition: (projects) => {
      const lowBacklog = projects.filter(p => p.stats.背锅率 <= 30).length
      const lowHairLoss = projects.filter(p => p.stats.脱发度 <= 30).length
      return lowBacklog >= 2 && lowHairLoss >= 2
    },
    description: '职场如浮云，你已超脱世俗。背锅率低、发际线稳，此乃修仙之最高境界。建议继续保持，但也要适当入世，毕竟房租还是要交的。',
    socialMatch: '宜结缘'
  },
  {
    title: '搞钱机器',
    condition: (projects) => {
      const richProjects = projects.filter(p => p.stats.搞钱运 >= 70).length
      return richProjects >= 3 || (projects.length >= 2 && richProjects / projects.length >= 0.6)
    },
    description: '你的项目选择精准，搞钱能力一流。建议多结善缘，毕竟钱多了容易没朋友。记住：搞钱虽好，但也要注意发际线保卫战。',
    socialMatch: '宜合伙'
  },
  {
    title: '带资大怨种',
    condition: (projects) => {
      const sucker = projects.filter(p => 
        p.stats.搞钱运 <= 30 && p.stats.背锅率 >= 60
      ).length
      return sucker >= 2
    },
    description: '你的项目生涯充满奉献精神，钱少锅多还乐在其中。此乃职场大怨种之最高境界，建议立即反思人生，或者考虑出家。记住：怨种不可怕，可怕的是怨种还觉得自己很幸福。',
    socialMatch: '忌结缘'
  },
  {
    title: '代码苦行僧',
    condition: (projects) => {
      const coder = projects.filter(p => 
        p.stats.代码风水 >= 60 && p.stats.搞钱运 <= 40
      ).length
      return coder >= 2
    },
    description: '代码是你的信仰，技术是你的追求，搞钱什么的都是浮云。此命格者，适合做技术大牛，但建议偶尔关注一下工资卡，毕竟理想不能当饭吃。',
    socialMatch: '随缘吧'
  },
  {
    title: '职场混子',
    condition: (projects) => {
      const avgStats = projects.reduce((acc, p) => ({
        搞钱运: acc.搞钱运 + p.stats.搞钱运,
        背锅率: acc.背锅率 + p.stats.背锅率,
        脱发度: acc.脱发度 + p.stats.脱发度
      }), { 搞钱运: 0, 背锅率: 0, 脱发度: 0 })
      
      const count = projects.length
      return count >= 3 && 
        avgStats.搞钱运 / count >= 40 && avgStats.搞钱运 / count <= 60 &&
        avgStats.背锅率 / count >= 30 && avgStats.背锅率 / count <= 50 &&
        avgStats.脱发度 / count >= 30 && avgStats.脱发度 / count <= 50
    },
    description: '你的项目生涯平平无奇，不好不坏，主打一个稳字。此乃职场混子之最高境界，建议继续保持，毕竟不卷不躺，才是人生赢家。',
    socialMatch: '随缘吧'
  }
]

const DEFAULT_DESTINY = {
  name: '凡人项目',
  comment: '此项目命格平平，无甚特别。建议多拜拜产品经理，少惹测试大佬，顺其自然，随遇而安。记住：平凡也是一种幸福，至少锅不会太大。'
}

const DEFAULT_USER_REALM: UserRealmRule = {
  title: '职场萌新',
  condition: () => true,
  description: '你的项目测算之旅才刚刚开始，命运的大门正在缓缓打开。建议多测几个项目，让命运的轮廓更加清晰。记住：每一个项目，都是一次修行。',
  socialMatch: '随缘吧'
}

function simpleHash(str: string): number {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i)
    hash |= 0
  }
  return Math.abs(hash)
}

function generateId(input: ProjectInput): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  const seedString = `${input.name}-${input.techStack.join('')}-${input.contractRole}-${input.deadline}-${input.legacyCode}`
  const seed = simpleHash(seedString)
  let result = 'DEST_'
  for (let i = 0; i < 8; i++) {
    const charIndex = ((seed * (i + 7)) % chars.length + chars.length) % chars.length
    result += chars.charAt(Math.floor(charIndex))
  }
  return result
}

function clamp(value: number, min: number = 0, max: number = 100): number {
  return Math.max(min, Math.min(max, value))
}

function calculateBaseStats(input: ProjectInput): ProjectStats {
  const baseStats: ProjectStats = {
    搞钱运: 50,
    背锅率: 50,
    脱发度: 50,
    代码风水: 50,
    跳票率: 50
  }

  input.techStack.forEach(element => {
    const bonus = FIVE_ELEMENT_BONUS[element]
    Object.entries(bonus).forEach(([key, value]) => {
      baseStats[key as keyof ProjectStats] += value || 0
    })
  })

  const contractMod = CONTRACT_ROLE_MODIFIER[input.contractRole]
  Object.entries(contractMod).forEach(([key, value]) => {
    baseStats[key as keyof ProjectStats] += value || 0
  })

  const deadlineMod = DEADLINE_MODIFIER[input.deadline]
  Object.entries(deadlineMod).forEach(([key, value]) => {
    baseStats[key as keyof ProjectStats] += value || 0
  })

  const legacyMod = LEGACY_CODE_MODIFIER[input.legacyCode]
  Object.entries(legacyMod).forEach(([key, value]) => {
    baseStats[key as keyof ProjectStats] += value || 0
  })

  const seedString = `${input.name}-${input.techStack.join('')}-${input.contractRole}-${input.deadline}-${input.legacyCode}`
  const seed = simpleHash(seedString)
  
  const keys = Object.keys(baseStats) as Array<keyof ProjectStats>
  keys.forEach((key, index) => {
    const pseudoRandom = ((seed * (index + 13)) % 100) / 100
    const randomFactor = Math.floor(pseudoRandom * 21) - 10
    baseStats[key] += randomFactor
  })

  Object.keys(baseStats).forEach(key => {
    baseStats[key as keyof ProjectStats] = clamp(baseStats[key as keyof ProjectStats])
  })

  return baseStats
}

function determineDestiny(stats: ProjectStats, input: ProjectInput): { name: string; comment: string } {
  for (const rule of DESTINY_RULES) {
    if (rule.condition(stats, input)) {
      return { name: rule.name, comment: rule.comment }
    }
  }
  return { name: DEFAULT_DESTINY.name, comment: DEFAULT_DESTINY.comment }
}

export function calculateProjectDestiny(input: ProjectInput): ProjectResult {
  const stats = calculateBaseStats(input)
  const { name: destinyName, comment } = determineDestiny(stats, input)
  
  return {
    id: generateId(input),
    input,
    stats,
    destinyName,
    comment
  }
}

export function calculateUserStatus(projects: ProjectResult[]): UserStatus {
  if (projects.length === 0) {
    return {
      title: DEFAULT_USER_REALM.title,
      description: DEFAULT_USER_REALM.description,
      socialMatch: DEFAULT_USER_REALM.socialMatch
    }
  }

  for (const rule of USER_REALM_RULES) {
    if (rule.condition(projects)) {
      return {
        title: rule.title,
        description: rule.description,
        socialMatch: rule.socialMatch
      }
    }
  }

  return {
    title: DEFAULT_USER_REALM.title,
    description: DEFAULT_USER_REALM.description,
    socialMatch: DEFAULT_USER_REALM.socialMatch
  }
}

export function getStatsLabel(value: number): string {
  if (value >= 90) return '极上'
  if (value >= 75) return '上佳'
  if (value >= 60) return '中上'
  if (value >= 45) return '中等'
  if (value >= 30) return '中下'
  if (value >= 15) return '下等'
  return '极下'
}

export function getStatsColor(value: number): string {
  if (value >= 75) return '#ffd700'
  if (value >= 50) return '#00ff88'
  if (value >= 30) return '#00f5ff'
  return '#ff3366'
}

export const FIVE_ELEMENT_NAMES: Record<FiveElement, string> = {
  '金': '金·架构之道',
  '木': '木·生长之力',
  '水': '水·流动之韵',
  '火': '火·激情之焰',
  '土': '土·稳重之基'
}

export const FIVE_ELEMENT_DESC: Record<FiveElement, string> = {
  '金': '主搞钱运与代码风水，适合金融、电商类项目',
  '木': '主代码风水与跳票率降低，适合长期维护项目',
  '水': '主跳票率提升但搞钱运略降，适合创意类项目',
  '火': '主脱发度与背锅率提升，适合高并发、高压力项目',
  '土': '主背锅率降低与代码风水提升，适合基础设施项目'
}

// 游戏状态
const gameState = {
    age: 0,
    stage: '出生',
    health: 50,
    wealth: 50,
    wisdom: 50,
    happiness: 50,
    family: 50,      // 家庭关系
    honor: 50,       // 社会声誉/荣誉
    personality: {   // 性格特质
        courage: 50,     // 勇气
        empathy: 50,     // 同理心
        ambition: 50     // 野心
    },
    birthEnvironment: null,  // 出生环境
    currentEventIndex: 0,
    history: []
};

// 人生阶段定义
const lifeStages = [
    { name: '童年', ageRange: [0, 12] },
    { name: '少年', ageRange: [13, 18] },
    { name: '青年', ageRange: [19, 30] },
    { name: '中年', ageRange: [31, 50] },
    { name: '老年', ageRange: [51, 100] }
];

// 事件库
const events = [
    // 出生环境选择（起点）
    {
        stage: '出生',
        age: 0,
        title: '降生在平行宇宙',
        description: '在无数平行宇宙中，你即将降生在一个特定的家庭环境。这将深刻影响你的起点和人生轨迹...',
        choices: [
            {
                text: '🏙️ 富裕家庭 - 父母是成功企业家，拥有丰厚资源',
                effects: { wealth: 30, family: 20, honor: 10, health: 10 },
                meta: { birthEnvironment: 'wealthy' }
            },
            {
                text: '📚 知识分子家庭 - 父母是大学教授，重视教育',
                effects: { wisdom: 30, family: 20, honor: 10, happiness: 10 },
                meta: { birthEnvironment: 'intellectual' }
            },
            {
                text: '🌾 普通工薪家庭 - 父母勤劳朴实，生活温馨',
                effects: { family: 30, happiness: 15, health: 10 },
                meta: { birthEnvironment: 'ordinary' }
            },
            {
                text: '⚡ 单亲家庭 - 环境困难但充满爱，学会独立',
                effects: { family: 15, happiness: -10, wisdom: 10, health: 5 },
                meta: { birthEnvironment: 'singleParent', personality: { courage: 15, empathy: 10 } }
            }
        ]
    },
    // 童年事件 - 性格养成
    {
        stage: '童年',
        age: 3,
        title: '第一次冲突',
        description: '在幼儿园，有个小朋友抢走了你最喜欢的玩具。你会怎么做？这将塑造你最初的性格特质...',
        choices: [
            {
                text: '💪 勇敢地抢回来，捍卫自己的权益',
                effects: { happiness: 5, health: 5 },
                meta: { personality: { courage: 15, ambition: 10 } }
            },
            {
                text: '🤝 邀请对方一起玩，学会分享',
                effects: { family: 10, happiness: 10 },
                meta: { personality: { empathy: 20 } }
            },
            {
                text: '😢 找老师帮忙解决，寻求保护',
                effects: { wisdom: 5, family: 5 },
                meta: { personality: { empathy: 5 } }
            },
            {
                text: '😶 默默走开，选择其他玩具',
                effects: { wisdom: 10, happiness: -5 },
                meta: { personality: { empathy: 10 } }
            }
        ]
    },
    {
        stage: '童年',
        age: 5,
        title: '价值观的萌芽',
        description: '父母给了你一些零花钱，你在商店看到了很多想要的东西，但钱不够买全部...',
        choices: [
            {
                text: '🎮 买最想要的玩具，满足当下欲望',
                effects: { happiness: 15, wealth: -5 },
                meta: { personality: { ambition: 5 } }
            },
            {
                text: '💰 存起来，为未来更大的目标做准备',
                effects: { wealth: 10, wisdom: 10 },
                meta: { personality: { ambition: 10 } }
            },
            {
                text: '🎁 买礼物送给父母，表达感恩',
                effects: { family: 20, happiness: 10, wealth: -5 },
                meta: { personality: { empathy: 15 } }
            },
            {
                text: '📚 买一本有趣的书，投资知识',
                effects: { wisdom: 15, happiness: 5 },
                meta: { personality: { ambition: 5 } }
            }
        ]
    },
    {
        stage: '童年',
        age: 8,
        title: '目睹不公',
        description: '在学校，你看到一个同学因为家境贫寒被其他人嘲笑。你的反应是？',
        choices: [
            {
                text: '⚔️ 挺身而出，为同学说话，对抗霸凌',
                effects: { honor: 15, family: 5, happiness: 5 },
                meta: { personality: { courage: 15, empathy: 10 } }
            },
            {
                text: '🤝 默默帮助那位同学，成为朋友',
                effects: { family: 15, happiness: 10, honor: 5 },
                meta: { personality: { empathy: 20 } }
            },
            {
                text: '😶 保持沉默，不想惹麻烦',
                effects: { wisdom: 5, happiness: -5, honor: -5 },
                meta: { personality: { courage: -10 } }
            },
            {
                text: '👨‍🏫 告诉老师，寻求成人帮助',
                effects: { wisdom: 10, honor: 10 },
                meta: { personality: { empathy: 10 } }
            }
        ]
    },
    {
        stage: '童年',
        age: 10,
        title: '兴趣与未来',
        description: '你在多个领域都展现出天赋，但时间有限，需要专注发展某一方向...',
        choices: [
            {
                text: '💻 沉迷于拆解电脑，探索数字世界',
                effects: { wisdom: 20, happiness: 10, health: -5 },
                meta: { personality: { ambition: 10 } }
            },
            {
                text: '🎨 醉心于艺术创作，表达内心世界',
                effects: { happiness: 20, wisdom: 10, family: 5 },
                meta: { personality: { empathy: 10 } }
            },
            {
                text: '⚽ 热爱体育运动，享受团队协作',
                effects: { health: 20, happiness: 15, family: 10 },
                meta: { personality: { courage: 10 } }
            },
            {
                text: '📚 博览群书，构建知识体系',
                effects: { wisdom: 25, honor: 5 },
                meta: { personality: { ambition: 15 } }
            }
        ]
    },
    // 少年事件 - 价值观形成期
    {
        stage: '少年',
        age: 12,
        title: '道德困境',
        description: '考试中，坐在你旁边的好朋友偷偷递纸条求助。老师没有注意到。你会怎么做？',
        choices: [
            {
                text: '✅ 帮助朋友，友情高于一切',
                effects: { family: 15, honor: -10, happiness: 5 },
                meta: { personality: { empathy: 15 } }
            },
            {
                text: '❌ 拒绝帮助，坚持原则和诚信',
                effects: { honor: 20, wisdom: 10, family: -10 },
                meta: { personality: { courage: 10 } }
            },
            {
                text: '🤔 考后帮助朋友补习，长期解决问题',
                effects: { family: 20, wisdom: 15, honor: 10, happiness: 10 },
                meta: { personality: { wisdom: 15, empathy: 10 } }
            },
            {
                text: '😰 假装没看见，避免卷入',
                effects: { happiness: -10, honor: -5 },
                meta: { personality: { courage: -10 } }
            }
        ]
    },
    {
        stage: '少年',
        age: 14,
        title: '网络时代的诱惑',
        description: '你接触到了互联网，发现了区块链和加密货币的世界。同时也看到网络游戏、社交媒体的吸引力...',
        choices: [
            {
                text: '⛓️ 深入研究区块链技术，自学编程',
                effects: { wisdom: 25, wealth: 5, health: -10, happiness: 10 },
                meta: { personality: { ambition: 20 } }
            },
            {
                text: '🎮 沉迷网络游戏，逃避现实压力',
                effects: { happiness: 15, wisdom: -15, health: -15, family: -10 },
                meta: { personality: { ambition: -10 } }
            },
            {
                text: '📱 活跃于社交媒体，建立人脉',
                effects: { family: 15, honor: 10, happiness: 10, health: -5 },
                meta: { personality: { empathy: 10 } }
            },
            {
                text: '⚖️ 合理分配，学习与娱乐并重',
                effects: { wisdom: 15, happiness: 15, health: 5 },
                meta: { personality: { wisdom: 10 } }
            }
        ]
    },
    {
        stage: '少年',
        age: 16,
        title: '处事哲学的抉择',
        description: '班级竞选班长，你有机会参选。有人劝你拉票，有人建议你用实力说话，还有人说不值得费力...',
        choices: [
            {
                text: '🗳️ 积极竞选，展现领导才能',
                effects: { honor: 20, family: 10, wisdom: 10, happiness: 10 },
                meta: { personality: { ambition: 20, courage: 15 } }
            },
            {
                text: '🎯 默默做事，用行动证明自己',
                effects: { honor: 15, wisdom: 15, family: 10 },
                meta: { personality: { ambition: 10 } }
            },
            {
                text: '🤝 辅助他人竞选，甘做幕后',
                effects: { family: 20, wisdom: 10, happiness: 10 },
                meta: { personality: { empathy: 15 } }
            },
            {
                text: '📚 专注学业，不参与竞选',
                effects: { wisdom: 20, happiness: 5 },
                meta: { personality: { ambition: -5 } }
            }
        ]
    },
    {
        stage: '少年',
        age: 17,
        title: '人生方向的思考',
        description: '高考临近，你需要思考未来的路。是追随热门专业、听从父母建议，还是追随内心？',
        choices: [
            {
                text: '💻 选择热门的计算机/区块链专业',
                effects: { wisdom: 15, wealth: 15, happiness: 5 },
                meta: { personality: { ambition: 15 } }
            },
            {
                text: '👨‍👩‍👧 听从父母安排，报考他们期望的专业',
                effects: { family: 25, wisdom: 10, happiness: -10 },
                meta: { personality: { empathy: 5 } }
            },
            {
                text: '❤️ 追随内心热爱，选择冷门但喜欢的专业',
                effects: { happiness: 25, wisdom: 15, wealth: -10, family: -10 },
                meta: { personality: { courage: 20 } }
            },
            {
                text: '⚖️ 综合考量，选择兴趣与前景兼顾的方向',
                effects: { wisdom: 20, happiness: 15, family: 10 },
                meta: { personality: { wisdom: 15 } }
            }
        ]
    },
    // 青年事件
    {
        stage: '青年',
        age: 19,
        title: '大学专业选择',
        description: '高考结束，你需要选择未来的专业方向...',
        choices: [
            {
                text: '💻 计算机科学，进入热门行业',
                effects: { wisdom: 15, wealth: 10, happiness: 5 }
            },
            {
                text: '⛓️ 区块链工程，探索Web3.0前沿',
                effects: { wisdom: 20, wealth: 5, happiness: 10 }
            },
            {
                text: '💼 工商管理，培养商业思维',
                effects: { wisdom: 10, wealth: 15, happiness: 5 }
            },
            {
                text: '🎨 数字艺术设计，追随NFT浪潮',
                effects: { happiness: 15, wisdom: 10, wealth: 5 }
            }
        ]
    },
    {
        stage: '青年',
        age: 21,
        title: '实习中的道德考验',
        description: '在实习公司，你发现了一个数据造假的问题。揭发可能影响你的实习评价，沉默则违背良知...',
        choices: [
            {
                text: '⚖️ 勇敢揭发，维护正义',
                effects: { honor: 30, courage: 20, wealth: -10, happiness: -10 },
                meta: { personality: { courage: 25 } }
            },
            {
                text: '🤐 保持沉默，保护自己利益',
                effects: { wealth: 10, honor: -20, happiness: -15 },
                meta: { personality: { courage: -15 } }
            },
            {
                text: '💬 私下和上级沟通，寻求解决',
                effects: { wisdom: 15, honor: 15, family: 10 },
                meta: { personality: { wisdom: 15, empathy: 10 } }
            },
            {
                text: '🚪 辞去实习，远离是非',
                effects: { honor: 10, happiness: -5, wealth: -5 },
                meta: { personality: { courage: 5 } }
            }
        ]
    },
    {
        stage: '青年',
        age: 22,
        title: '爱情的哲学',
        description: '你遇到了心动的人，但对方的家庭背景、价值观与你有差异。如何看待这段感情？',
        choices: [
            {
                text: '❤️ 爱情至上，勇敢追求真爱',
                effects: { happiness: 25, family: -10, wealth: -5 },
                meta: { personality: { courage: 15, empathy: 10 } }
            },
            {
                text: '👨‍👩‍👧 考虑家庭意见，理性看待',
                effects: { family: 20, wisdom: 10, happiness: -10 },
                meta: { personality: { empathy: 10 } }
            },
            {
                text: '⚖️ 先深入了解，再做决定',
                effects: { wisdom: 15, happiness: 10, family: 5 },
                meta: { personality: { wisdom: 15 } }
            },
            {
                text: '🎯 专注事业，感情顺其自然',
                effects: { wealth: 15, wisdom: 10, happiness: -5 },
                meta: { personality: { ambition: 15 } }
            }
        ]
    },
    {
        stage: '青年',
        age: 24,
        title: '毕业后的选择',
        description: '大学毕业了，你需要规划职业道路...',
        choices: [
            {
                text: '🏢 进入大公司，追求稳定发展',
                effects: { wealth: 15, wisdom: 10, happiness: 5 }
            },
            {
                text: '⛓️ 加入区块链创业公司，探索Web3',
                effects: { wealth: 10, wisdom: 20, health: -10, happiness: 15 }
            },
            {
                text: '🎮 进入元宇宙公司，打造虚拟世界',
                effects: { wisdom: 15, wealth: 15, happiness: 10 }
            },
            {
                text: '🌍 间隔年旅行，寻找人生方向',
                effects: { happiness: 25, wealth: -15, wisdom: 10 }
            }
        ]
    },
    {
        stage: '青年',
        age: 26,
        title: '加密货币投资机遇',
        description: '你听说了比特币和以太坊的故事，朋友建议你投资加密货币...',
        choices: [
            {
                text: '₿ 重仓投资比特币，相信去中心化未来',
                effects: { wealth: 35, wisdom: 10, health: -10, happiness: -5 }
            },
            {
                text: '⚡ 投资以太坊和DeFi项目，参与智能合约革命',
                effects: { wealth: 30, wisdom: 15, happiness: 5 }
            },
            {
                text: '🎯 小额试水，谨慎观望',
                effects: { wealth: 10, wisdom: 5, happiness: 5 }
            },
            {
                text: '🚫 认为风险太大，不参与投资',
                effects: { wealth: 5, wisdom: -5, happiness: 10, health: 5 }
            }
        ]
    },
    // 中年事件
    {
        stage: '中年',
        age: 28,
        title: '婚姻的考验',
        description: '感情稳定后，是否要步入婚姻殿堂？',
        choices: [
            {
                text: '💍 结婚成家，开始新生活',
                effects: { happiness: 15, wealth: -10, health: 5 }
            },
            {
                text: '⏰ 再等等，事业为重',
                effects: { wealth: 15, wisdom: 5, happiness: -5 }
            },
            {
                text: '🚶 保持单身，享受自由',
                effects: { happiness: 10, wealth: 10, health: 5 }
            }
        ]
    },
    {
        stage: '中年',
        age: 32,
        title: '职业发展的岔路口',
        description: '你在工作中遇到了新的机遇...',
        choices: [
            {
                text: '📈 晋升管理岗，承担更多责任',
                effects: { wealth: 20, wisdom: 10, health: -10, happiness: 5 }
            },
            {
                text: '⛓️ 创办区块链公司，发行自己的代币',
                effects: { wealth: -10, wisdom: 25, health: -15, happiness: 20 }
            },
            {
                text: '🖼️ 转型NFT艺术家，在元宇宙中创作',
                effects: { wealth: 15, wisdom: 10, happiness: 25, health: -5 }
            },
            {
                text: '🌿 降低节奏，追求工作生活平衡',
                effects: { health: 15, happiness: 20, wealth: -5 }
            }
        ]
    },
    {
        stage: '中年',
        age: 35,
        title: 'NFT与元宇宙的选择',
        description: '元宇宙时代来临，NFT市场火爆，你看到了新的机会...',
        choices: [
            {
                text: '🖼️ 购买蓝筹NFT，参与数字艺术收藏',
                effects: { wealth: 25, wisdom: 15, happiness: 10 }
            },
            {
                text: '🏠 在元宇宙买地建设，布局虚拟房产',
                effects: { wealth: 20, wisdom: 10, happiness: 15 }
            },
            {
                text: '🎮 开发元宇宙游戏，创造虚拟经济',
                effects: { wealth: 15, wisdom: 20, health: -10, happiness: 20 }
            },
            {
                text: '🤔 观望等待，不急于入场',
                effects: { wisdom: 5, health: 5, happiness: 5 }
            }
        ]
    },
    {
        stage: '中年',
        age: 38,
        title: '财富管理决策',
        description: '你积累了一些财富，需要做投资规划...',
        choices: [
            {
                text: '🏠 买房投资，追求稳健收益',
                effects: { wealth: 20, happiness: 10 }
            },
            {
                text: '💎 配置加密货币组合，长期持有',
                effects: { wealth: 35, happiness: -5, health: -10 }
            },
            {
                text: '🌊 参与DeFi流动性挖矿，赚取被动收入',
                effects: { wealth: 30, wisdom: 15, happiness: 5 }
            },
            {
                text: '⚖️ 传统+加密混合配置，平衡风险',
                effects: { wealth: 25, wisdom: 10, happiness: 10 }
            }
        ]
    },
    {
        stage: '中年',
        age: 40,
        title: '家庭与事业的平衡',
        description: '你的事业正处于上升期，但孩子即将中考，配偶希望你多陪伴家人。同时公司有重要项目需要你...',
        choices: [
            {
                text: '👨‍👩‍👧 果断选择家庭，陪伴孩子关键时期',
                effects: { family: 30, happiness: 20, wealth: -15, honor: -10 },
                meta: { personality: { empathy: 20 } }
            },
            {
                text: '💼 全力投入工作，为家庭创造更好条件',
                effects: { wealth: 30, honor: 15, family: -20, happiness: -10 },
                meta: { personality: { ambition: 15 } }
            },
            {
                text: '⚖️ 努力平衡，两头兼顾（很累但值得）',
                effects: { family: 15, wealth: 15, health: -15, happiness: 5 },
                meta: { personality: { wisdom: 15 } }
            },
            {
                text: '💬 和家人坦诚沟通，共同商量解决',
                effects: { family: 25, wisdom: 15, happiness: 15 },
                meta: { personality: { empathy: 15, wisdom: 10 } }
            }
        ]
    },
    {
        stage: '中年',
        age: 42,
        title: 'DAO组织与社会责任',
        description: '一个知名的去中心化自治组织(DAO)邀请你加入。同时，你也看到了传统公益组织需要帮助。如何践行社会责任？',
        choices: [
            {
                text: '⛓️ 积极参与DAO治理，推动Web3公益',
                effects: { wisdom: 20, wealth: 15, honor: 20, happiness: 15, health: -10 },
                meta: { personality: { ambition: 15 } }
            },
            {
                text: '🤲 投身传统公益，帮助弱势群体',
                effects: { honor: 30, family: 20, happiness: 25, wealth: -20 },
                meta: { personality: { empathy: 25 } }
            },
            {
                text: '💡 创建自己的DAO，将公益与Web3结合',
                effects: { wisdom: 25, honor: 25, wealth: 10, happiness: 20, health: -15 },
                meta: { personality: { ambition: 20, empathy: 15 } }
            },
            {
                text: '💰 通过投资支持，用资本推动改变',
                effects: { wealth: 15, honor: 15, happiness: 10 },
                meta: { personality: { ambition: 10 } }
            }
        ]
    },
    {
        stage: '中年',
        age: 43,
        title: '面对背叛',
        description: '你最信任的合作伙伴背叛了你，导致重大损失。这是对你处事哲学的严峻考验...',
        choices: [
            {
                text: '⚖️ 诉诸法律，讨回公道',
                effects: { honor: 20, wealth: -10, happiness: -15, health: -10 },
                meta: { personality: { courage: 20 } }
            },
            {
                text: '🕊️ 选择原谅，放下仇恨继续前行',
                effects: { happiness: 20, wisdom: 20, family: 15, wealth: -20 },
                meta: { personality: { empathy: 25 } }
            },
            {
                text: '💪 汲取教训，重新站起来证明自己',
                effects: { wisdom: 25, wealth: 15, honor: 15, health: -15 },
                meta: { personality: { courage: 20, ambition: 15 } }
            },
            {
                text: '😔 陷入痛苦，一蹶不振',
                effects: { happiness: -30, health: -20, wealth: -10, family: -10 },
                meta: { personality: { courage: -20 } }
            }
        ]
    },
    {
        stage: '中年',
        age: 45,
        title: '中年危机与Web3转型',
        description: '人到中年，你开始重新审视人生的意义，Web3给了你新的可能...',
        choices: [
            {
                text: '💪 健身养生，找回青春活力',
                effects: { health: 20, happiness: 15, wealth: -5 }
            },
            {
                text: '⛓️ 全职投入Web3，成为布道者',
                effects: { wisdom: 25, happiness: 20, wealth: 15, health: -15 }
            },
            {
                text: '🎨 在元宇宙开设虚拟画廊',
                effects: { happiness: 25, wealth: 20, wisdom: 10 }
            },
            {
                text: '👨‍👩‍👧 陪伴家人，享受天伦之乐',
                effects: { happiness: 25, health: 5 }
            }
        ]
    },
    // 老年事件
    {
        stage: '老年',
        age: 55,
        title: '退休的准备与数字遗产',
        description: '即将退休，你开始规划退休生活，同时思考数字资产的传承...',
        choices: [
            {
                text: '🌴 提前退休，靠加密资产被动收入生活',
                effects: { happiness: 30, health: 10, wealth: 15 }
            },
            {
                text: '⛓️ 继续做Web3顾问，分享经验',
                effects: { wealth: 25, wisdom: 15, happiness: 15 }
            },
            {
                text: '🎓 在元宇宙开设课程，教授区块链知识',
                effects: { happiness: 25, wisdom: 20, wealth: 10 }
            }
        ]
    },
    {
        stage: '老年',
        age: 62,
        title: '晚年的智慧与数字永生',
        description: '回顾一生，你想在区块链上留下什么印记？',
        choices: [
            {
                text: '👴 含饴弄孙，传授Web3知识给后代',
                effects: { happiness: 30, wisdom: 10, health: 5 }
            },
            {
                text: '🖼️ 将人生铸造成NFT，实现数字永生',
                effects: { wisdom: 25, happiness: 30, wealth: 10 }
            },
            {
                text: '🌍 在元宇宙环游世界，体验虚拟旅行',
                effects: { happiness: 35, health: 5, wisdom: 15 }
            },
            {
                text: '💝 捐赠加密资产，支持开源和公益',
                effects: { happiness: 40, wealth: -20, wisdom: 15 }
            }
        ]
    },
    {
        stage: '老年',
        age: 65,
        title: '代际关系的智慧',
        description: '子女在重大人生决策上寻求你的意见，但你的观念与年轻一代有代沟...',
        choices: [
            {
                text: '👴 坚持传统智慧，劝说子女听从经验',
                effects: { family: -10, wisdom: 10, happiness: -5 },
                meta: { personality: { empathy: -10 } }
            },
            {
                text: '🤝 尊重子女选择，给予支持和祝福',
                effects: { family: 30, happiness: 25, wisdom: 15 },
                meta: { personality: { empathy: 20, wisdom: 15 } }
            },
            {
                text: '💬 深入沟通，分享经验但不强加',
                effects: { family: 25, wisdom: 20, happiness: 20 },
                meta: { personality: { wisdom: 20, empathy: 15 } }
            },
            {
                text: '🌱 鼓励探索，做坚实的后盾',
                effects: { family: 35, happiness: 30, honor: 15 },
                meta: { personality: { empathy: 25 } }
            }
        ]
    },
    {
        stage: '老年',
        age: 70,
        title: '人生的传承',
        description: '古稀之年，你思考如何将一生的智慧和财富传承给后代...',
        choices: [
            {
                text: '📜 将经验写成书，留给后人',
                effects: { honor: 30, wisdom: 20, happiness: 30 },
                meta: { personality: { wisdom: 20 } }
            },
            {
                text: '🖼️ 将人生铸造成NFT系列，实现数字永生',
                effects: { wisdom: 25, honor: 25, happiness: 35, wealth: 10 },
                meta: { personality: { ambition: 15 } }
            },
            {
                text: '💰 平均分配财产，让子女自由发展',
                effects: { family: 30, happiness: 25, wealth: -30 },
                meta: { personality: { empathy: 20 } }
            },
            {
                text: '🌍 捐赠给公益/DAO，造福社会',
                effects: { honor: 40, happiness: 35, wealth: -40, family: -10 },
                meta: { personality: { empathy: 30 } }
            }
        ]
    },
    {
        stage: '老年',
        age: 75,
        title: '生命的意义',
        description: '回顾这一生，你最珍视的是什么？这将决定你人生的终极意义...',
        choices: [
            {
                text: '👨‍👩‍👧 家人的爱与陪伴',
                effects: { family: 30, happiness: 40, health: 15 },
                meta: { personality: { empathy: 20 } }
            },
            {
                text: '🏆 取得的成就与荣誉',
                effects: { honor: 30, happiness: 30, wisdom: 15 },
                meta: { personality: { ambition: 15 } }
            },
            {
                text: '🌱 帮助过的人与做过的善事',
                effects: { honor: 35, family: 25, happiness: 45, health: 10 },
                meta: { personality: { empathy: 25 } }
            },
            {
                text: '🎯 实现了自己的人生理想',
                effects: { happiness: 50, wisdom: 20, health: 10 },
                meta: { personality: { courage: 20 } }
            }
        ]
    }
];

// 结局判定
const endings = [
    {
        name: '跨维度传奇 ✨',
        condition: (stats) => stats.health > 80 && stats.wealth > 80 && stats.wisdom > 80 && stats.happiness > 80 && stats.family > 70 && stats.honor > 70,
        description: '你的人生堪称完美！在现实世界和数字宇宙中都取得了巨大成就。健康的身体、丰厚的财富（包括海量的加密资产）、渊博的智慧、满满的幸福感、和谐的家庭关系和崇高的社会声誉。你成为了Web3.0时代的传奇人物，你的数字足迹将永远铭刻在区块链上，激励着无数探索者。'
    },
    {
        name: '家族守护者 👨‍👩‍👧‍👦',
        condition: (stats) => stats.family > 85 && stats.happiness > 70,
        description: '你将家庭视为人生的核心。无论事业多忙，你始终把家人放在第一位。你见证了子女的成长，陪伴了父母的晚年，维系了家族的温暖。在生命的终点，你被爱包围，没有遗憾。你的家族因你而团结，你的爱将代代相传。'
    },
    {
        name: '社会楷模 🏆',
        condition: (stats) => stats.honor > 85 && stats.wisdom > 70,
        description: '你一生正直磊落，坚守道德底线，用行动践行着社会责任。无论是传统公益还是Web3.0慈善，你都倾力而为。你的名字成为正义和诚信的代名词，你的事迹激励着后来者。即使在区块链的透明世界中，你的每一笔交易都经得起检验。'
    },
    {
        name: 'Web3.0先驱者 ⛓️',
        condition: (stats) => stats.wisdom > 75 && stats.wealth > 70 && stats.happiness > 60,
        description: '你是区块链时代的先行者！早期押注加密货币和Web3技术，既收获了财富自由，也推动了去中心化革命。你的钱包地址成为传奇，你创建的DAO影响了整个行业，你在元宇宙中的建设将永续存在。'
    },
    {
        name: '元宇宙建筑师 🏗️',
        condition: (stats) => stats.wisdom > 70 && stats.happiness > 75,
        description: '你在虚拟世界中找到了人生的意义！创造了繁荣的元宇宙社区，你的NFT作品被无数人收藏，你建设的虚拟空间成为数字时代的地标。虽然现实生活简朴，但你在数字世界的精神财富无价。'
    },
    {
        name: '加密货币巨鲸 🐋',
        condition: (stats) => stats.wealth > 80 && stats.health > 50,
        description: '你成为了加密世界的传奇巨鲸！早期投资比特币和以太坊让你实现了财富自由，你的钱包持有各种蓝筹NFT和DeFi代币。虽然经历了无数次市场暴涨暴跌，但最终你守住了信仰，收获了巨额回报。链上的每一笔交易都记录着你的传奇。'
    },
    {
        name: 'DeFi宗师 💎',
        condition: (stats) => stats.wisdom > 80 && stats.happiness > 60,
        description: '你深谙去中心化金融的奥秘，精通各种DeFi协议和智能合约。虽然财富不是最多，但你通过流动性挖矿和收益农场获得了稳定的被动收入。你开发的DeFi协议帮助了无数人，你在Web3社区中受人尊敬，找到了金融民主化的真谛。'
    },
    {
        name: '幸福圆满 ☀️',
        condition: (stats) => stats.happiness > 80 && stats.family > 75 && stats.health > 60,
        description: '你始终追随内心，做自己喜欢的事。你拥有最宝贵的东西——幸福的家庭和健康的身体。虽然不够富有和出名，但你的人生充满欢笑、温暖和爱。每个平凡的日子都闪烁着幸福的光芒。'
    },
    {
        name: '德艺双馨 🎖️',
        condition: (stats) => stats.honor > 75 && stats.wisdom > 75 && stats.family > 60,
        description: '你德才兼备，既有渊博的学识，又有高尚的品格。你在专业领域成就斐然，同时不忘回馈社会和家庭。你的声望来自实力，你的尊重源于人品。无论在现实还是元宇宙，你都是众人敬仰的榜样。'
    },
    {
        name: '健康长寿',
        condition: (stats) => stats.health > 80 && stats.age > 75,
        description: '你注重养生保健，拥有健康的身体。你享受了漫长的人生，见证了时代的变迁。身体的健康让你的晚年生活质量很高。'
    },
    {
        name: '平凡而温暖',
        condition: (stats) => stats.happiness > 50 && stats.health > 40,
        description: '你的人生虽然平凡，但充满了温暖的回忆。你珍惜与家人朋友相处的时光，在平淡中找到了生活的意义。这也是一种幸福。'
    },
    {
        name: '奋斗者',
        condition: (stats) => stats.wealth > 60 && stats.wisdom > 60,
        description: '你一生都在努力奋斗，虽然付出了健康和一些快乐，但你实现了许多目标。你的坚持和努力值得尊敬。'
    },
    {
        name: '孤独的追求者 💔',
        condition: (stats) => stats.family < 30 && stats.honor < 30,
        description: '你在追逐梦想的路上，逐渐失去了家人的理解和社会的认可。财富和成就没能填补内心的空虚。当你回首往事，发现最珍贵的人和最重要的时刻都已错过。也许在另一个平行宇宙，你会做出不同的选择...'
    },
    {
        name: '破碎的人生 😞',
        condition: (stats) => stats.happiness < 30 || stats.health < 30,
        description: '你的人生充满了遗憾和痛苦。太多错误的选择让你失去了重要的东西——健康、快乐、家庭或尊严。生命的天平严重失衡，心灵和肉体都承受着巨大的负担。如果能重来，也许一切都会不同...'
    },
    {
        name: '普通的一生',
        condition: () => true, // 默认结局
        description: '你度过了平凡的一生，有得有失。虽然没有惊天动地的成就，但你也留下了属于自己的足迹。这就是大多数人的人生。'
    }
];

// DOM元素
const startScreen = document.getElementById('start-screen');
const gameScreenMain = document.getElementById('game-screen-main');
const endingScreen = document.getElementById('ending-screen');
const startBtn = document.getElementById('start-btn');
const restartBtn = document.getElementById('restart-btn');
const viewHistoryBtn = document.getElementById('view-history-btn');
const toggleHistoryBtn = document.getElementById('toggle-history');

// 初始化游戏
function initGame() {
    gameState.age = 0;
    gameState.stage = '出生';
    gameState.health = 50;
    gameState.wealth = 50;
    gameState.wisdom = 50;
    gameState.happiness = 50;
    gameState.family = 50;
    gameState.honor = 50;
    gameState.personality = {
        courage: 50,
        empathy: 50,
        ambition: 50
    };
    gameState.birthEnvironment = null;
    gameState.currentEventIndex = 0;
    gameState.history = [];

    showScreen('game');
    updateUI();
    nextEvent();
}

// 显示屏幕
function showScreen(screen) {
    startScreen.classList.remove('active');
    gameScreenMain.classList.remove('active');
    endingScreen.classList.remove('active');

    if (screen === 'start') {
        startScreen.classList.add('active');
    } else if (screen === 'game') {
        gameScreenMain.classList.add('active');
    } else if (screen === 'ending') {
        endingScreen.classList.add('active');
    }
}

// 更新UI
function updateUI() {
    // 更新年龄和阶段
    document.getElementById('age').textContent = gameState.age;
    document.getElementById('stage').textContent = gameState.stage;

    // 更新属性值和进度条
    updateStat('health', gameState.health);
    updateStat('wealth', gameState.wealth);
    updateStat('wisdom', gameState.wisdom);
    updateStat('happiness', gameState.happiness);
    updateStat('family', gameState.family);
    updateStat('honor', gameState.honor);
}

// 更新单个属性
function updateStat(stat, value) {
    // 限制在0-100之间
    value = Math.max(0, Math.min(100, value));
    gameState[stat] = value;

    document.getElementById(`${stat}-value`).textContent = Math.round(value);
    document.querySelector(`.${stat}-fill`).style.width = value + '%';
}

// 获取当前阶段
function getCurrentStage(age) {
    for (const stage of lifeStages) {
        if (age >= stage.ageRange[0] && age <= stage.ageRange[1]) {
            return stage.name;
        }
    }
    return '未知';
}

// 下一个事件
function nextEvent() {
    if (gameState.currentEventIndex >= events.length) {
        endGame();
        return;
    }

    // 检查是否死亡
    if (gameState.health <= 0) {
        endGame(true);
        return;
    }

    const event = events[gameState.currentEventIndex];
    gameState.age = event.age;
    gameState.stage = event.stage;

    // 显示事件
    document.getElementById('event-title').textContent = event.title;
    document.getElementById('event-description').textContent = event.description;

    // 显示选择
    const choicesContainer = document.getElementById('choices');
    choicesContainer.innerHTML = '';

    event.choices.forEach((choice, index) => {
        const button = document.createElement('button');
        button.className = 'choice-btn';
        button.textContent = choice.text;
        button.onclick = () => makeChoice(choice, event);
        choicesContainer.appendChild(button);
    });

    updateUI();
}

// 做出选择
function makeChoice(choice, event) {
    // 应用效果
    if (choice.effects.health) updateStat('health', gameState.health + choice.effects.health);
    if (choice.effects.wealth) updateStat('wealth', gameState.wealth + choice.effects.wealth);
    if (choice.effects.wisdom) updateStat('wisdom', gameState.wisdom + choice.effects.wisdom);
    if (choice.effects.happiness) updateStat('happiness', gameState.happiness + choice.effects.happiness);
    if (choice.effects.family) updateStat('family', gameState.family + choice.effects.family);
    if (choice.effects.honor) updateStat('honor', gameState.honor + choice.effects.honor);

    // 处理meta数据（出生环境、性格特质等）
    if (choice.meta) {
        if (choice.meta.birthEnvironment) {
            gameState.birthEnvironment = choice.meta.birthEnvironment;
        }
        if (choice.meta.personality) {
            for (let trait in choice.meta.personality) {
                if (gameState.personality[trait] !== undefined) {
                    gameState.personality[trait] = Math.max(0, Math.min(100,
                        gameState.personality[trait] + choice.meta.personality[trait]));
                }
            }
        }
    }

    // 记录历史
    gameState.history.push({
        age: gameState.age,
        stage: gameState.stage,
        event: event.title,
        choice: choice.text
    });

    // 更新历史显示
    updateHistory();

    // 下一个事件
    gameState.currentEventIndex++;

    // 延迟显示下一个事件，让玩家看到属性变化
    setTimeout(() => {
        nextEvent();
    }, 500);
}

// 更新历史记录
function updateHistory() {
    const historyList = document.getElementById('history-list');
    historyList.innerHTML = '';

    gameState.history.forEach(item => {
        const historyItem = document.createElement('div');
        historyItem.className = 'history-item';
        historyItem.innerHTML = `
            <div class="history-age">${item.age}岁 - ${item.stage}</div>
            <div class="history-event">${item.event}</div>
            <div class="history-choice">选择: ${item.choice}</div>
        `;
        historyList.appendChild(historyItem);
    });
}

// 结束游戏
function endGame(earlyDeath = false) {
    showScreen('ending');

    // 显示最终年龄
    document.getElementById('final-age').textContent = gameState.age;

    // 显示最终属性
    document.getElementById('final-health').textContent = Math.round(gameState.health);
    document.getElementById('final-wealth').textContent = Math.round(gameState.wealth);
    document.getElementById('final-wisdom').textContent = Math.round(gameState.wisdom);
    document.getElementById('final-happiness').textContent = Math.round(gameState.happiness);
    document.getElementById('final-family').textContent = Math.round(gameState.family);
    document.getElementById('final-honor').textContent = Math.round(gameState.honor);

    // 判定结局
    let ending;
    if (earlyDeath) {
        ending = {
            name: '过载的赛博灵魂 ⚠️',
            description: '由于过度沉浸在加密货币交易和元宇宙中，忽视了身体健康，你的生命过早地画上了句号。24小时盯盘、熬夜参与DAO治理、在虚拟世界中不眠不休...你的数字钱包里有巨额财富，但肉体却无法支撑。也许在某个平行宇宙中，你会做出不同的选择...'
        };
    } else {
        for (const end of endings) {
            if (end.condition(gameState)) {
                ending = end;
                break;
            }
        }
    }

    document.getElementById('ending-title').textContent = ending.name;
    document.getElementById('ending-description').textContent = ending.description;
}

// 显示完整历史
viewHistoryBtn.addEventListener('click', () => {
    const fullHistory = document.getElementById('full-history');
    fullHistory.classList.toggle('active');

    if (fullHistory.classList.contains('active')) {
        fullHistory.innerHTML = '<h3>完整人生历程</h3>';
        gameState.history.forEach(item => {
            const historyItem = document.createElement('div');
            historyItem.className = 'history-item';
            historyItem.innerHTML = `
                <div class="history-age">${item.age}岁 - ${item.stage}</div>
                <div class="history-event">${item.event}</div>
                <div class="history-choice">选择: ${item.choice}</div>
            `;
            fullHistory.appendChild(historyItem);
        });
        viewHistoryBtn.textContent = '隐藏历程';
    } else {
        viewHistoryBtn.textContent = '查看完整历程';
    }
});

// 切换历史面板
toggleHistoryBtn.addEventListener('click', () => {
    const historyPanel = document.getElementById('history-panel');
    historyPanel.classList.toggle('active');

    if (historyPanel.classList.contains('active')) {
        toggleHistoryBtn.textContent = '隐藏历史记录';
    } else {
        toggleHistoryBtn.textContent = '查看历史记录';
    }
});

// 事件监听
startBtn.addEventListener('click', initGame);
restartBtn.addEventListener('click', () => {
    showScreen('start');
});

// 初始显示开始屏幕
showScreen('start');

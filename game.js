// 游戏状态
const gameState = {
    age: 0,
    stage: '出生',
    health: 50,
    wealth: 50,
    wisdom: 50,
    happiness: 50,
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
    // 童年事件
    {
        stage: '童年',
        age: 3,
        title: '兴趣的萌芽',
        description: '你对世界充满好奇，父母想培养你的兴趣爱好...',
        choices: [
            {
                text: '📚 学习阅读和写作，培养文学素养',
                effects: { wisdom: 10, happiness: 5 }
            },
            {
                text: '🎨 学习绘画和音乐，发展艺术天赋',
                effects: { happiness: 10, wisdom: 5 }
            },
            {
                text: '⚽ 参加体育运动，强健体魄',
                effects: { health: 15, happiness: 5 }
            }
        ]
    },
    {
        stage: '童年',
        age: 8,
        title: '小学时代的抉择',
        description: '你在学校表现不错，老师建议你参加一个特长班...',
        choices: [
            {
                text: '📖 参加奥数竞赛班，提升逻辑思维',
                effects: { wisdom: 15, health: -5, happiness: -5 }
            },
            {
                text: '🎭 加入话剧社，锻炼表达能力',
                effects: { happiness: 10, wisdom: 5 }
            },
            {
                text: '🎮 更想自由玩耍，享受童年',
                effects: { happiness: 15, wisdom: -5 }
            }
        ]
    },
    // 少年事件
    {
        stage: '少年',
        age: 13,
        title: '初中的友谊',
        description: '你结识了一群新朋友，他们的生活方式各不相同...',
        choices: [
            {
                text: '📚 和学霸组团学习，一起进步',
                effects: { wisdom: 15, happiness: 5 }
            },
            {
                text: '🎮 和游戏爱好者一起玩乐',
                effects: { happiness: 10, wisdom: -10, health: -5 }
            },
            {
                text: '🏃 加入运动社团，保持活力',
                effects: { health: 15, happiness: 10 }
            }
        ]
    },
    {
        stage: '少年',
        age: 16,
        title: '高中的转折点',
        description: '高中的学习压力陡增，你需要做出选择...',
        choices: [
            {
                text: '📖 全力以赴学习，目标名校',
                effects: { wisdom: 20, health: -10, happiness: -5 }
            },
            {
                text: '⚖️ 平衡学习和生活，稳步前进',
                effects: { wisdom: 10, health: 5, happiness: 10 }
            },
            {
                text: '🎨 追求艺术特长，走艺考道路',
                effects: { happiness: 15, wisdom: 5, wealth: -5 }
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
        age: 22,
        title: '大学的恋爱',
        description: '你遇到了心动的人，这段感情该如何发展？',
        choices: [
            {
                text: '❤️ 全心投入这段感情',
                effects: { happiness: 20, wisdom: -5, wealth: -5 }
            },
            {
                text: '⚖️ 保持理智，学业为重',
                effects: { wisdom: 10, happiness: 5 }
            },
            {
                text: '🚫 专注自我提升，暂不考虑',
                effects: { wisdom: 15, wealth: 10, happiness: -10 }
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
        age: 42,
        title: 'DAO组织的邀请',
        description: '一个知名的去中心化自治组织(DAO)邀请你加入，共同治理社区...',
        choices: [
            {
                text: '🤝 积极参与DAO治理，成为核心贡献者',
                effects: { wisdom: 20, wealth: 15, happiness: 20, health: -10 }
            },
            {
                text: '💰 仅作为投资者持有治理代币',
                effects: { wealth: 20, wisdom: 5, happiness: 5 }
            },
            {
                text: '🎯 创建自己的DAO，实践理想',
                effects: { wisdom: 25, wealth: 10, happiness: 25, health: -15 }
            },
            {
                text: '🚫 保持独立，不参与DAO',
                effects: { health: 10, happiness: 10 }
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
        age: 70,
        title: '人生的总结',
        description: '古稀之年，你对人生有了更深的领悟...',
        choices: [
            {
                text: '😌 知足常乐，平静接受',
                effects: { happiness: 20, health: 10 }
            },
            {
                text: '🎯 仍有遗憾，继续追求',
                effects: { wisdom: 10, happiness: 5, health: -5 }
            },
            {
                text: '🧘 修身养性，内心平和',
                effects: { health: 15, happiness: 25, wisdom: 15 }
            }
        ]
    }
];

// 结局判定
const endings = [
    {
        name: '跨维度传奇 ✨',
        condition: (stats) => stats.health > 80 && stats.wealth > 80 && stats.wisdom > 80 && stats.happiness > 80,
        description: '你的人生堪称完美！在现实世界和数字宇宙中都取得了巨大成就。健康的身体、丰厚的财富（包括海量的加密资产）、渊博的智慧和满满的幸福感。你成为了Web3.0时代的传奇人物，你的数字足迹将永远铭刻在区块链上，激励着无数探索者。'
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
        name: '幸福的人生',
        condition: (stats) => stats.happiness > 80 && stats.health > 60,
        description: '你始终追随内心，做自己喜欢的事。虽然不够富有和出名，但你拥有最宝贵的东西——幸福。你的人生充满欢笑和温暖的回忆。'
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
        name: '遗憾的人生',
        condition: (stats) => stats.happiness < 30 || stats.health < 30,
        description: '你的人生充满了遗憾和痛苦。太多的选择让你失去了重要的东西。如果能重来，也许会有不同的选择...'
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

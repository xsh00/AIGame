<template>
  <div class="game-container">
    <div class="game-header">
      <h1>🎮 记忆翻牌游戏</h1>
      <div class="game-info">
        <div class="info-item">
          <span class="label">步数：</span>
          <span class="value">{{ moves }}</span>
        </div>
        <div class="info-item">
          <span class="label">时间：</span>
          <span class="value">{{ formatTime(time) }}</span>
        </div>
        <div class="info-item">
          <span class="label">配对：</span>
          <span class="value">{{ matched }} / {{ totalPairs }}</span>
        </div>
      </div>
      <button @click="resetGame" class="btn-reset">重新开始</button>
    </div>

    <div class="game-board">
      <div
        v-for="card in cards"
        :key="card.id"
        class="card"
        :class="{
          'flipped': card.flipped,
          'matched': card.matched
        }"
        @click="flipCard(card)"
      >
        <div class="card-inner">
          <div class="card-front">❓</div>
          <div class="card-back">{{ card.emoji }}</div>
        </div>
      </div>
    </div>

    <div v-if="gameWon" class="victory-modal">
      <div class="victory-content">
        <h2>🎉 恭喜过关！</h2>
        <p>用时：{{ formatTime(time) }}</p>
        <p>步数：{{ moves }}</p>
        <button @click="resetGame" class="btn-play-again">再玩一次</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

// 游戏状态
const cards = ref([])
const flippedCards = ref([])
const moves = ref(0)
const matched = ref(0)
const time = ref(0)
const timer = ref(null)
const gameStarted = ref(false)
const isProcessing = ref(false)

// 卡片表情符号
const emojis = ['🍎', '🍌', '🍇', '🍊', '🍓', '🍒', '🥝', '🍑']

// 总对数
const totalPairs = computed(() => emojis.length)

// 游戏胜利判断
const gameWon = computed(() => matched.value === totalPairs.value)

// 初始化游戏
const initGame = () => {
  const gameCards = []
  let id = 0

  // 创建成对的卡片
  emojis.forEach(emoji => {
    gameCards.push(
      { id: id++, emoji, flipped: false, matched: false },
      { id: id++, emoji, flipped: false, matched: false }
    )
  })

  // 洗牌
  cards.value = shuffleArray(gameCards)
  flippedCards.value = []
  moves.value = 0
  matched.value = 0
  time.value = 0
  gameStarted.value = false
  isProcessing.value = false

  // 清除计时器
  if (timer.value) {
    clearInterval(timer.value)
    timer.value = null
  }
}

// 洗牌算法（Fisher-Yates）
const shuffleArray = (array) => {
  const newArray = [...array]
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]]
  }
  return newArray
}

// 翻牌
const flipCard = (card) => {
  // 如果正在处理中、卡片已翻开或已配对，则不处理
  if (isProcessing.value || card.flipped || card.matched) {
    return
  }

  // 开始计时
  if (!gameStarted.value) {
    startTimer()
    gameStarted.value = true
  }

  // 翻开卡片
  card.flipped = true
  flippedCards.value.push(card)

  // 如果翻开了两张卡片
  if (flippedCards.value.length === 2) {
    isProcessing.value = true
    moves.value++
    checkMatch()
  }
}

// 检查匹配
const checkMatch = () => {
  const [card1, card2] = flippedCards.value

  if (card1.emoji === card2.emoji) {
    // 匹配成功
    card1.matched = true
    card2.matched = true
    matched.value++
    flippedCards.value = []
    isProcessing.value = false

    // 检查游戏是否完成
    if (gameWon.value) {
      stopTimer()
    }
  } else {
    // 不匹配，延迟后翻回
    setTimeout(() => {
      card1.flipped = false
      card2.flipped = false
      flippedCards.value = []
      isProcessing.value = false
    }, 800)
  }
}

// 开始计时
const startTimer = () => {
  timer.value = setInterval(() => {
    time.value++
  }, 1000)
}

// 停止计时
const stopTimer = () => {
  if (timer.value) {
    clearInterval(timer.value)
    timer.value = null
  }
}

// 格式化时间
const formatTime = (seconds) => {
  const mins = Math.floor(seconds / 60)
  const secs = seconds % 60
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
}

// 重置游戏
const resetGame = () => {
  stopTimer()
  initGame()
}

// 挂载时初始化游戏
onMounted(() => {
  initGame()
})

// 卸载时清除计时器
onUnmounted(() => {
  stopTimer()
})
</script>

<style scoped>
.game-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.game-header {
  text-align: center;
  margin-bottom: 30px;
  background: rgba(255, 255, 255, 0.95);
  padding: 20px;
  border-radius: 15px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
}

.game-header h1 {
  color: #667eea;
  margin-bottom: 20px;
  font-size: 2rem;
}

.game-info {
  display: flex;
  justify-content: center;
  gap: 30px;
  margin-bottom: 20px;
  flex-wrap: wrap;
}

.info-item {
  font-size: 1.1rem;
}

.info-item .label {
  color: #666;
  font-weight: normal;
}

.info-item .value {
  color: #667eea;
  font-weight: bold;
  font-size: 1.3rem;
}

.btn-reset {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  padding: 12px 30px;
  border-radius: 25px;
  font-size: 1rem;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
  font-weight: bold;
}

.btn-reset:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 20px rgba(102, 126, 234, 0.4);
}

.btn-reset:active {
  transform: translateY(0);
}

.game-board {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 15px;
  perspective: 1000px;
}

.card {
  aspect-ratio: 1;
  cursor: pointer;
  position: relative;
}

.card-inner {
  width: 100%;
  height: 100%;
  position: relative;
  transform-style: preserve-3d;
  transition: transform 0.6s;
}

.card.flipped .card-inner,
.card.matched .card-inner {
  transform: rotateY(180deg);
}

.card-front,
.card-back {
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 15px;
  font-size: 3rem;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
}

.card-front {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.card-back {
  background: white;
  transform: rotateY(180deg);
}

.card.matched .card-back {
  background: linear-gradient(135deg, #84fab0 0%, #8fd3f4 100%);
  animation: matchPulse 0.6s ease-in-out;
}

@keyframes matchPulse {
  0%, 100% {
    transform: rotateY(180deg) scale(1);
  }
  50% {
    transform: rotateY(180deg) scale(1.1);
  }
}

.card:not(.flipped):not(.matched):hover .card-inner {
  transform: scale(1.05);
}

.victory-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  animation: fadeIn 0.3s;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.victory-content {
  background: white;
  padding: 40px;
  border-radius: 20px;
  text-align: center;
  box-shadow: 0 10px 50px rgba(0, 0, 0, 0.3);
  animation: slideUp 0.5s;
}

@keyframes slideUp {
  from {
    transform: translateY(50px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

.victory-content h2 {
  color: #667eea;
  font-size: 2.5rem;
  margin-bottom: 20px;
}

.victory-content p {
  font-size: 1.3rem;
  color: #666;
  margin: 10px 0;
}

.btn-play-again {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  padding: 15px 40px;
  border-radius: 25px;
  font-size: 1.1rem;
  cursor: pointer;
  margin-top: 20px;
  transition: transform 0.2s, box-shadow 0.2s;
  font-weight: bold;
}

.btn-play-again:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 20px rgba(102, 126, 234, 0.4);
}

.btn-play-again:active {
  transform: translateY(0);
}

/* 响应式设计 */
@media (max-width: 600px) {
  .game-board {
    grid-template-columns: repeat(4, 1fr);
    gap: 10px;
  }

  .card-front,
  .card-back {
    font-size: 2rem;
  }

  .game-header h1 {
    font-size: 1.5rem;
  }

  .game-info {
    gap: 15px;
  }

  .info-item {
    font-size: 0.9rem;
  }

  .info-item .value {
    font-size: 1.1rem;
  }
}
</style>


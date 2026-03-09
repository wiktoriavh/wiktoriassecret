<template>
  <aside class="card">
    <DirectorySpan>
      /README.md
    </DirectorySpan>
    <div class="me">
      <h2>Hi there, I'm Wiktoria</h2>
      <img src="https://placecats.com/100/100" alt="Wiktoria">
    </div>
    <p>I'm a software engineer and recently (like 2025) I started to become more interested in owning my own content. I
      am collecting vinyls from music that I enjoy, started buying digital music, and want to buy physical movies and
      own that as well. Building my own digital streaming service.</p>
    <p>Besides tech, I enjoy board games, card games, tabletop RPGs, and video games. I just love to play, solo or with
      friends. I also love plants. I have cacti, succulents, and jungle plants at home. But living in central europe
      means I don't have the best weather conditions...</p>
    <p>Other places I can be found:</p>
    <ul>
      <li>
        <a href="https://github.com/wiktoriavh" rel="me">GitHub</a>
      </li>
    </ul>
  </aside>
</template>

<style scoped>
aside {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  transform: rotate(-.5deg);
  position: sticky;
  top: 2rem;
  align-self: flex-start;
}



@media (max-width: 768px) {
  aside {
    position: static;
  }

  aside .me {
    text-align: left;
    justify-content: space-between;
  }
}

.readme {
  font-size: 0.8rem;
  color: #666666;
}

.me {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 1rem;
}

.me img {
  border-radius: 1rem;
  transform: rotate(5deg);
}

ul {
  list-style: disc;
  padding-left: 2rem;

}
</style>
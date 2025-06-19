import React from 'react';
import '../styles/Sections.css'; // General section styles

const About = () => (
  <section id="about" className="about-section">
    <h1>🤓 About This Glorious Quizzo</h1>
    <p>Welcome, brave clicker of links. You’ve entered a realm where questions fly faster than your Wi-Fi drops and only the strongest brains survive.</p>
    <p><h3>⚙️ Built with 🧪, 💻, and probably snacks</h3>
    <p>This site was stitched together with:

<br />HTML-  Like the crust on your pizza: structurally vital, mildly underappreciated.

<br />CSS-  Making sure this place doesn’t look like a MySpace page from 2006.

<br />JavaScript-  Turning clicks into chaos and quizzes into full-blown adventures.

<br />React-  Because we like our components spicy, reusable, and reactive (pun intended).</p></p>
<p><h3>🕹️ How It Works (aka What You’re Supposed to Do)</h3>
<p>Hit that User tab in the navbar. Yep, right there.

<br />Enter your name like it’s the SATs (but less stress).

<br />BAM 💥 You’re in! Take the quiz, flex that noggin.

<br />Slide into the Leaderboard and see if you’re Einstein... or a potato 🥔.</p></p>
<p><h3>🧠 Why Tho?</h3>
<p>Because learning + laughter = elite combo. Because clicking answers is way more fun than listening to lectures. Because you deserve a quiz site that’s got both vibes and variables.</p></p>
    <p>Questions are fetched from the <a href="https://opentdb.com/" target="_blank" rel="noopener noreferrer">Open Trivia Database</a> API.</p>
  </section>
);

export default About;
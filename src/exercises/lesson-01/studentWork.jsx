//Lesson-01 Introduction to React
//Exercise: Build an "About Me" Component in this file

export default function StudentWork() {
  //add variables here
  const name = 'Olena Salnikova';
  //calculating age based on birth year (1989) and current year dynamically
  const currentYear = new Date().getFullYear();
  const birthYear = 1989;
  const age = currentYear - birthYear;
  const hobbies = [
    'Exploring programming',
    'Spending time with my family',
    'Cooking',
    'Drawing',
    'Photography',
    'Traveling',
    'Hiking',
    'Reading',
  ];

  return (
    <div>
      {/* add JSX here */}
      <h1>About Me</h1>
      <p>
        <b>Hello! My name is {name}.</b> I am {age} years old. I was born and
        raised in Ukraine and graduated from{' '}
        <b>Kharkiv National University of Radio Electronics (KhNURE)</b>, where
        I built a strong foundation in information technology and biomedical
        engineering. I began my IT career as a <i>QA Engineer</i> and worked on
        diverse projects for over <b>8 years of professional experience</b>,
        collaborating with teams to deliver high-quality software.
      </p>
      <p>
        <b>After moving to the United States in 2021</b> and taking a career
        break to care for my two children, I am now focusing on my professional
        development. Currently, I’m studying programming at{' '}
        <b>Code the Dream (CTD)</b> to strengthen my technical skills and return
        to the IT field.
      </p>
      <p>
        I believe that every stage of life brings valuable experience, and I am
        motivated to grow professionally and build a successful career in the IT
        industry that has always inspired me.
      </p>
      <h2>My Hobbies:</h2>
      <ul>
        {hobbies.map((hobby, idx) => (
          <li key={idx}>{hobby}</li>
        ))}
      </ul>
    </div>
  );
}

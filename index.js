let express = require(`express`);
let app = express();
let port = 3000;

app.listen(port, function () {
  console.log(`Сервер запущен http://localhost:${port}`);
});

app.use(express.static(`public`)); // раздача статики

let hbs = require(`hbs`);
app.set(`views`, `views`);
app.set(`view engine`, `hbs`);

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

let bloquotes = [
  {
    bloquote: `Человек должен мечтать, чтобы видеть смысл жизни.`,
    author: `Вольтер`,
    id: null,
  },

  {
    bloquote: `Если Франция не была стёрта с карты Европы, то в первую очередь 
     благодаря мужеству русских солдат.`,
    author: `Фердинанд Фош`,
    id: null,
  },

  {
    bloquote: `Русский - это не тот, кто носит русскую фамилию, а тот, 
     кто любит Россию и считает её своим отечеством.`,
    author: `Антон Иванович Деникин`,
    id: null,
  },

  {
    bloquote: `Судьба иногда умеет хорошо шутить.`,
    author: `Керенский Александр Фёдорович`,
    id: null,
  },

  {
    bloquote: `Гениальные люди — это метеоры, призванные сгореть, чтобы озарить свой век.`,
    author: `Наполеон I Бонапарт`,
    id: null,
  },

  {
    bloquote: `Будьте менее любопытны о людях, но более любопытны об идеях.`,
    author: `Мария Кюри`,
  },

  {
    bloquote: `Не так уж сложно изменить общество – сложно изменить себя.`,
    author: `Нельсон Мандела`,
  },

  {
    bloquote: `Я дышу, и значит – я люблю! Я люблю, и значит – я живу!`,
    author: `Владимир Высоцкий`,
  },

  {
    bloquote: `Фантазия мужчины – лучшее оружие женщины.`,
    author: `Софи Лорен`,
  },

  {
    bloquote: `Не оборачивается тот, кто устремлён к звёздам.`,
    author: `Леонардо да Винчи`,
  },

  {
    bloquote: `Ненавижу советы – все, кроме своих.`,
    author: `Одри Хепберн`,
  },

  {
    bloquote: `Оправдайте, не карайте, но назовите зло злом.`,
    author: `Фёдор Достоевский`,
  },

  {
    bloquote: `Любите искусство в себе, а не себя в искусстве.`,
    author: `Константин Станиславский`,
  },

  {
    bloquote: `Делай, что можешь, с тем, что имеешь, там, где ты есть.`,
    author: `Теодор Рузвельт`,
  },

  {
    bloquote: `Успех – это способность шагать от одной неудачи к другой, не теряя энтузиазма.`,
    author: `Уинстон Черчиль`,
  },

  {
    bloquote: `Существуют два мнения: одно моё, другое глупое.`,
    author: `Никита Хрущёв`,
  },

  {
    bloquote: `Лучше десять лет переговоров, чем один день войны.`,
    author: `Андрей Андреевич Громыко`,
  },

  {
    bloquote: `А что такое жизнь, как не цепь вдохновенных безрассудств?`,
    author: `Бернард Шоу`,
  },

  // {
  //     bloquote: ``,
  //     author: ``,
  // },

  // {
  //     bloquote: ``,
  //     author: ``,
  // },
];

let bloqNode = [];

let counter = 5; // количество цитат в одном тесте

for (let i = 0; i < counter; i++) {
  let elem = bloquotes[getRandomInt(0, bloquotes.length)];

  for (let j = 0; j < bloqNode.length; j++) {
      while (bloqNode[j] == elem) {
          elem = bloquotes[getRandomInt(0, bloquotes.length)];
      }
  }
      
  bloqNode.push(elem)
  
}

let authors = [];
for (let i = 0; i < bloqNode.length; i++) {
  authors.push(bloqNode[i].author);
}

let count = 0; // текущий номер вопроса
let trueAnswers = 0; // количество правильных ответов на текущем тесте

app.get(`/`, function (req, res) {
  if (count > 4) {
    res.render(`check`, {
      mark: trueAnswers,
    });
  } else {
    res.render(`index`, {
      bloquotes: bloqNode[count],
      authors: shuffle(authors),
    });
  }

  count++;
});

app.get(`/check`, function (req, res) {
  let name = req.query.name;

  if (name == bloqNode[count - 1].author) {
    trueAnswers++;
  }

  res.redirect(`/`);
});

app.get(`/zero`, function (req, res) {
  count = 0;
  trueAnswers = 0;
  bloqNode = [];
  authors = [];

  for (let i = 0; i < counter; i++) {
    let elem = bloquotes[getRandomInt(0, bloquotes.length)];

    for (let j = 0; j < bloqNode.length; j++) {
        while (bloqNode[j] == elem) {
            elem = bloquotes[getRandomInt(0, bloquotes.length)];
        }
    }
        
    bloqNode.push(elem)
    
}

  for (let i = 0; i < bloqNode.length; i++) {
    authors.push(bloqNode[i].author);
  }

  res.redirect(`/`);
});

app.get(`/restart`, function (req, res) {
  count = 0;
  trueAnswers = 0;

  res.redirect(`/`);
});

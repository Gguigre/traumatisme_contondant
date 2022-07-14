import React, { useState } from 'react'
import TinderCard from 'react-tinder-card'
import './App.css';

function App() {

  const [shouldImmobilize, setShouldImmobilize] = useState();

  const showImmobilize = () => {
    setShouldImmobilize(true)
  }
  const showDontImmobilize = () => {
    setShouldImmobilize(false)
  }

  const [questions, setQuestions] = useState([
    {
      name: "Victime à risque",
      onNo: showDontImmobilize,
      onYes: showImmobilize,
      description: [
        "Victime agée de <strong>plus de 65 ans</strong>",
        "<strong>Traumatisme</strong> vertébral ancien (fracture, luxation)",
        "<strong>Chirurgie</strong> de la colonne vertébrale.",
        "<strong>Maladie</strong> de la colonne vertébrale ou des os qui qui fragilise la colonne vertébrale (ostéoporose)",
      ]
    },
    {
      name: "Traumatisme à haut risque",
      onNo: showDontImmobilize,
      description: [
        "Chute sur la <strong>tête d’une hauteur > 1 mètre</strong>",
        "Chute sur les <strong>pieds/fesses d’une hauteur > 3 mètres.</strong>",
        "Passager d’un véhicule accidenté à grande vitesse ",
        "Absence de port de <strong>ceinture de sécurité (et déclenchement des airbags).</strong>",
        "<strong>Retournement</strong> d’un véhicule (tonneaux) à la suite d’une collision.",
        "Victime <strong>éjectée d’un véhicule</strong> lors de la collision.",
        "Accidents avec des <strong>véhicules à moteur de loisirs</strong> (jet-ski, quad, kart…).",
        "Collision avec un <strong>2 roues</strong> (conducteur ou passager du 2 roues).",
        "Piéton renversé.",
        "Chute de <strong>cheval</strong> (jockey)",
      ]
    },
    {
      name: "Signes d'atteinte de la moelle",
      onYes: showImmobilize,
      description: [
        "Perte ou diminution de la <strong>force musculaire ou de la motricité</strong> des mains ou des pieds (difficulté de serrer les mains, de bouger les orteils, de bouger un ou plusieurs membres).",
        "Perte ou une diminution de la <strong>sensibilité</strong> des membres supérieurs (mains) ou inférieurs (pied).",
        "Engourdissement, de sensations de <strong>décharges électriques</strong> au niveau des membres (paresthésie),",
        "Perte des <strong>urines ou des matières fécales.</strong>",
        "<strong>Erection</strong> chez l’homme (victime inconsciente, victime trouvée déshabillée).",
      ]
    },
    {
      name: "Signes d'atteinte du rachis",
      onYes: showImmobilize,
      description: [
        "<strong>Douleur spontanée</strong> siégeant au niveau du rachis.",
        "Douleur du rachis à la <strong>mobilisation, à la marche.</strong>",
        "Raideur de la nuque empêchant de <strong>tourner la tête.</strong>",
        "Douleur à la <strong>palpation prudente</strong> du rachis.",
        "<strong>Déformation</strong> évidente du rachis.",
      ]
    },
    {
      name: 'Fiabilité des réponses de la victime',
      onNo: showImmobilize,
      description: [
        "Aucune <strong>détresse vitale</strong>",
        "Aucune d'altération du <strong>niveau de conscience</strong>",
        "Aucune difficultés de <strong>communication</strong>",
        "Aucune influence dde <strong>l'alcoool ou d'autres drogues</strong>",
        "Aucune atteinte <strong>traumatique sévère</strong>",
      ]
    },
  ])

  const [currentIndex, setCurrentIndex] = useState(questions.length-1);

  const swiped = (direction, swipedQuestion) => {
    if (direction === 'left') {
      swipedQuestion.onNo && swipedQuestion.onNo(swipedQuestion)
    } else if (direction === 'right') {
      swipedQuestion.onYes && swipedQuestion.onYes(swipedQuestion)
    } else {
      swipedQuestion.onDontKnow && swipedQuestion.onDontKnow(swipedQuestion)
    }
  }

  return (
    <div className="App">
      {shouldImmobilize === true && <div className='card'>
                  <h1>IMMOBILISATION</h1>
                </div>}
      {shouldImmobilize === false && <div className='card'>
                  <h1>NE PAS IMMOBILISER</h1>
                </div>}
      {(shouldImmobilize === undefined || shouldImmobilize === null) && <>
        <div className='cardContainer'>
          {questions.map((question) =>
            <>
              <TinderCard className='swipe' key={question.name} onSwipe={(dir) => swiped(dir, question)}>
                <div className='card'>
                  <h3>{question.name}</h3>
                  {question.description && <ul>
                    {question.description.map(descriptionLine => <li dangerouslySetInnerHTML={{__html:descriptionLine}}></li>)}
                  </ul>}
                </div>
              </TinderCard>
            </>
          )}
        </div>
        <div className="buttonsContainer">
          <div className="noButton">✖️<br/>NON</div>
          {questions[currentIndex].onDontKnow && <div className="dontKnowButton">❓<br />NE SAIS PAS</div>}
          <div className="yesButton">✔️<br/>OUI</div>
        </div>
      </>}
    </div>
  );
}

export default App;

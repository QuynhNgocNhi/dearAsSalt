import React, { Component } from 'react'

export default class AboutScreen extends Component {
  render() {
    return (
      <div className="sas__blankpaper" style={{height: window.innerHeight}}>
        <div className="blankpaper__content">
          <div className="sas__about">
            <div>
              <div>
                <div className="blankpaper__header">·Project</div>
                <div>
                  “Dear as Salt” is a web-based game inspired by the tale Dear as salt (or Bene come il sale, in italian) from Italo Calvino’s Italian Fables, published for the first time in 1956. The story originally comes from Bologna and, telling the story of a young princess banished by her father, is able to draw attention to the power of misunderstandings, but also to every kitchen’s must: salt, no less.
                </div>
              </div>
              <div>
                <div className="blankpaper__header">·Content</div>
                <div>
                  In the game, you are the king and make your choices with the goal of reigning the kingdom as well as possible. Because salt is the most important element in the story, many of the choices you can revolve around it. You will meet many of the characters from the tale as well as someones, like a wizard or an alchemist, who will appear randomly. If your choices benefit the people of your kingdom as well as the economy, you will be rewarded with a good final score.
            </div>
              </div>
              <div>
                <div className="blankpaper__header">·Team</div>
                <div>
                  We are Teotihuacan, one of the groups of the Sociology of Media class for the academic year of 2019/2020 of the Communication Design Master of Science Program. We come from different countries and different academic backgrounds.
              </div>
                <ul>
                  <li>André Calderolli, Brazil</li>
                  <li>Bianca Chueng, Brazil</li>
                  <li>Dang Trung Nguyen, Vietnam</li>
                  <li>Fernanda De Alba, Mexico</li>
                  <li>Johannes Longardt, Germany</li>
                  <li>Tim Olbrich, Germany</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

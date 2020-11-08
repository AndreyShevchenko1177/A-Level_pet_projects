import logo from './logo.svg';
import './App.css';


{/* <!-- --------------------- White part ----------------------- --> */ }

const Topik = ({ children }) =>
  <div className="topik">
    <svg width="20" height="16" viewBox="0 0 20 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M12 0H8L0 16H4L12 0ZM20 0H16L8 16H12L20 0Z" fill="#FFCA00" />
    </svg>
    <span className="topikname">{children}</span>
  </div>


const Serviciten = () =>
  <div className="servicess_item">
    <img className="servicess_item__img" src="./images/Engineering_Service.png" alt="Engineering_Service" />
    <div className="servicess_item__info">
      <div className="servicess_item__info__name">Engineering Service</div>
      <div className="servicess_item__info__content">
        Software Development / Software Testing / Solutions Architecture /
        Business Analysis / Operations Support
          </div>
      <div className="movearrow">
        <a href="#" className="lern_more">
          <div className="servicess_item__info__more">
            <span className="lernmore">Learn More</span>
            <svg width="28" height="8" viewBox="0 0 28 8" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd"
                d="M24.2206 7.87969C24.063 8.0401 23.8006 8.0401 23.6375 7.87969C23.4798 7.72469 23.4798 7.46671 23.6375 7.31208L26.5945 4.40466L0.408252 4.40466C0.180792 4.4043 0 4.22654 0 4.00289C0 3.77924 0.180792 3.5957 0.408252 3.5957L26.5945 3.5957L23.6375 0.693704C23.4798 0.533285 23.4798 0.274952 23.6375 0.120314C23.8006 -0.0401049 24.0634 -0.0401049 24.2206 0.120314L27.8776 3.71601C28.0408 3.87101 28.0408 4.12899 27.8776 4.28362L24.2206 7.87969Z"
                fill="#202020" />
            </svg>
          </div>
        </a>
      </div>
    </div>
  </div>
{/* <!-- servicess_item --> */ }



const App = () =>
  <div className="App">


    {/* <!-- --------------------- White part ----------------------- --> */}

    <div className="whitepart">

      <Topik>Services</Topik>

      <div className="services">

        <Serviciten></Serviciten>

        {/* ************************************ */}



        <div className="servicess_item">
          <img className="servicess_item__img" src="./images/Internet_of_Things.png" alt="Engineering_Service" />
          <div className="servicess_item__info">
            <div className="servicess_item__info__name">Internet of Things</div>
            <div className="servicess_item__info__content">
              Intelligent Mobility / Predictive Maintenance / Smart
              Manufacturing
          </div>
            <div className="movearrow">
              <a href="#" className="lern_more">
                <div className="servicess_item__info__more">
                  <span className="lernmore">Learn More</span>
                  <svg width="28" height="8" viewBox="0 0 28 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd"
                      d="M24.2206 7.87969C24.063 8.0401 23.8006 8.0401 23.6375 7.87969C23.4798 7.72469 23.4798 7.46671 23.6375 7.31208L26.5945 4.40466L0.408252 4.40466C0.180792 4.4043 0 4.22654 0 4.00289C0 3.77924 0.180792 3.5957 0.408252 3.5957L26.5945 3.5957L23.6375 0.693704C23.4798 0.533285 23.4798 0.274952 23.6375 0.120314C23.8006 -0.0401049 24.0634 -0.0401049 24.2206 0.120314L27.8776 3.71601C28.0408 3.87101 28.0408 4.12899 27.8776 4.28362L24.2206 7.87969Z"
                      fill="#202020" />
                  </svg>
                </div>
              </a>
            </div>
          </div>
        </div>
        {/* <!-- servicess_item --> */}

        <div className="servicess_item">
          <img className="servicess_item__img" src="./images/Extended_Reality_XR.png" alt="Engineering_Service" />
          <div className="servicess_item__info">
            <div className="servicess_item__info__name">Extended Reality XR</div>
            <div className="servicess_item__info__content">VR / MR / AR</div>
            <div className="movearrow">
              <a href="#" className="lern_more">
                <div className="servicess_item__info__more">
                  <span className="lernmore">Learn More</span>
                  <svg width="28" height="8" viewBox="0 0 28 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd"
                      d="M24.2206 7.87969C24.063 8.0401 23.8006 8.0401 23.6375 7.87969C23.4798 7.72469 23.4798 7.46671 23.6375 7.31208L26.5945 4.40466L0.408252 4.40466C0.180792 4.4043 0 4.22654 0 4.00289C0 3.77924 0.180792 3.5957 0.408252 3.5957L26.5945 3.5957L23.6375 0.693704C23.4798 0.533285 23.4798 0.274952 23.6375 0.120314C23.8006 -0.0401049 24.0634 -0.0401049 24.2206 0.120314L27.8776 3.71601C28.0408 3.87101 28.0408 4.12899 27.8776 4.28362L24.2206 7.87969Z"
                      fill="#202020" />
                  </svg>
                </div>
              </a>
            </div>
          </div>
        </div>
        {/* <!-- servicess_item --> */}

        <div className="servicess_item">
          <img className="servicess_item__img" src="./images/AL_ML.png" alt="Engineering_Service" />
          <div className="servicess_item__info">
            <div className="servicess_item__info__name">AL & ML</div>
            <div className="servicess_item__info__content">
              Artificial Intelligence / Intelligent Automation / Advanced
              Analytics
          </div>
            <div className="movearrow">
              <a href="#" className="lern_more">
                <div className="servicess_item__info__more">
                  <span className="lernmore">Learn More</span>
                  <svg width="28" height="8" viewBox="0 0 28 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd"
                      d="M24.2206 7.87969C24.063 8.0401 23.8006 8.0401 23.6375 7.87969C23.4798 7.72469 23.4798 7.46671 23.6375 7.31208L26.5945 4.40466L0.408252 4.40466C0.180792 4.4043 0 4.22654 0 4.00289C0 3.77924 0.180792 3.5957 0.408252 3.5957L26.5945 3.5957L23.6375 0.693704C23.4798 0.533285 23.4798 0.274952 23.6375 0.120314C23.8006 -0.0401049 24.0634 -0.0401049 24.2206 0.120314L27.8776 3.71601C28.0408 3.87101 28.0408 4.12899 27.8776 4.28362L24.2206 7.87969Z"
                      fill="#202020" />
                  </svg>
                </div>
              </a>
            </div>
          </div>
        </div>
        {/* <!-- servicess_item --> */}

        <div className="servicess_item">
          <img className="servicess_item__img" src="./images/Big_Data.png" alt="Engineering_Service" />
          <div className="servicess_item__info">
            <div className="servicess_item__info__name">Big data & Analytics</div>
            <div className="servicess_item__info__content">
              BI & Augmented Analytics / Enterprise Data Platforms / Data
              Strategy and Governance
          </div>
            <div className="movearrow">
              <a href="#" className="lern_more">
                <div className="servicess_item__info__more">
                  <span className="lernmore">Learn More</span>
                  <svg width="28" height="8" viewBox="0 0 28 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd"
                      d="M24.2206 7.87969C24.063 8.0401 23.8006 8.0401 23.6375 7.87969C23.4798 7.72469 23.4798 7.46671 23.6375 7.31208L26.5945 4.40466L0.408252 4.40466C0.180792 4.4043 0 4.22654 0 4.00289C0 3.77924 0.180792 3.5957 0.408252 3.5957L26.5945 3.5957L23.6375 0.693704C23.4798 0.533285 23.4798 0.274952 23.6375 0.120314C23.8006 -0.0401049 24.0634 -0.0401049 24.2206 0.120314L27.8776 3.71601C28.0408 3.87101 28.0408 4.12899 27.8776 4.28362L24.2206 7.87969Z"
                      fill="#202020" />
                  </svg>
                </div>
              </a>
            </div>
          </div>
        </div>
        {/* <!-- servicess_item --> */}

        <div className="servicess_item">
          <img className="servicess_item__img" src="./images/Blockchain.png" alt="Engineering_Service" />
          <div className="servicess_item__info">
            <div className="servicess_item__info__name">Blockchain</div>
            <div className="servicess_item__info__content">
              Создаем прибыльные интернет-магазины, маркетплейсы и агрегаторы
          </div>
            <div className="movearrow">
              <a href="#" className="lern_more">
                <div className="servicess_item__info__more">
                  <span className="lernmore">Learn More</span>
                  <svg width="28" height="8" viewBox="0 0 28 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd"
                      d="M24.2206 7.87969C24.063 8.0401 23.8006 8.0401 23.6375 7.87969C23.4798 7.72469 23.4798 7.46671 23.6375 7.31208L26.5945 4.40466L0.408252 4.40466C0.180792 4.4043 0 4.22654 0 4.00289C0 3.77924 0.180792 3.5957 0.408252 3.5957L26.5945 3.5957L23.6375 0.693704C23.4798 0.533285 23.4798 0.274952 23.6375 0.120314C23.8006 -0.0401049 24.0634 -0.0401049 24.2206 0.120314L27.8776 3.71601C28.0408 3.87101 28.0408 4.12899 27.8776 4.28362L24.2206 7.87969Z"
                      fill="#202020" />
                  </svg>
                </div>
              </a>
            </div>
          </div>
        </div>
        {/* <!-- servicess_item --> */}

        <div className="servicess_item">
          <img className="servicess_item__img" src="./images/Game_Art.png" alt="Engineering_Service" />
          <div className="servicess_item__info">
            <div className="servicess_item__info__name">Game Art Production</div>
            <div className="servicess_item__info__content">
              Concept art, UI, illustration / 3D models and environments / VXT
              and animations
          </div>
            <div className="movearrow">
              <a href="#" className="lern_more">
                <div className="servicess_item__info__more">
                  <span className="lernmore">Learn More</span>
                  <svg width="28" height="8" viewBox="0 0 28 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd"
                      d="M24.2206 7.87969C24.063 8.0401 23.8006 8.0401 23.6375 7.87969C23.4798 7.72469 23.4798 7.46671 23.6375 7.31208L26.5945 4.40466L0.408252 4.40466C0.180792 4.4043 0 4.22654 0 4.00289C0 3.77924 0.180792 3.5957 0.408252 3.5957L26.5945 3.5957L23.6375 0.693704C23.4798 0.533285 23.4798 0.274952 23.6375 0.120314C23.8006 -0.0401049 24.0634 -0.0401049 24.2206 0.120314L27.8776 3.71601C28.0408 3.87101 28.0408 4.12899 27.8776 4.28362L24.2206 7.87969Z"
                      fill="#202020" />
                  </svg>
                </div>
              </a>
            </div>
          </div>
        </div>
        {/* <!-- servicess_item --> */}
      </div>
      {/* <!-- services --> */}

    </div>
  </div>

export default App;

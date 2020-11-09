import './App.css';


{/* <!-- --------------------- White part ----------------------- --> */ }

const Topik = ({ children }) =>
  <div className="topik">
    <svg width="20" height="16" viewBox="0 0 20 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M12 0H8L0 16H4L12 0ZM20 0H16L8 16H12L20 0Z" fill="#FFCA00" />
    </svg>
    <span className="topikname">{children}</span>
  </div>

const Servicitem = (props) =>
  <div className="servicess_item">
    <img className="servicess_item__img" src={props.imgUrl} alt={props.topikName} />
    <div className="servicess_item__info">
      <div className="servicess_item__info__name">{props.topikName}</div>
      <div className="servicess_item__info__content">{props.content}</div>
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



const PortfolioItem = (props) =>
  <div className="portfolio_item">
    <div className="portfolio_blok">
      <img src={props.portfolioImg} alt="" />
      <div className="portfolio_slidebox">
        <div className="slidebox_transparent">
          <div className="transparent_landing">{props.transparentLanding}</div>
          <div className="transparent_projectname">{props.transparentProjectname}</div>
        </div>
        <div className="slidebox_gray">
          <div className="slidebox_gray_inner">
            <div className="gray_text">{props.grayText}</div>
            <div className="gray_arrow">
              <svg width="28" height="8" viewBox="0 0 28 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd"
                  d="M24.2206 7.87969C24.063 8.0401 23.8006 8.0401 23.6375 7.87969C23.4798 7.72469 23.4798 7.46671 23.6375 7.31208L26.5945 4.40466L0.408252 4.40466C0.180792 4.4043 0 4.22654 0 4.00289C0 3.77924 0.180792 3.5957 0.408252 3.5957L26.5945 3.5957L23.6375 0.693704C23.4798 0.533285 23.4798 0.274952 23.6375 0.120314C23.8006 -0.0401049 24.0634 -0.0401049 24.2206 0.120314L27.8776 3.71601C28.0408 3.87101 28.0408 4.12899 27.8776 4.28362L24.2206 7.87969Z"
                  fill="#202020" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>


const SkilsItem = (props) =>
  <div className="skills_item">
    <div className="skills_item__value">{props.skillsItemValue}</div>
    <div className="skills_item__description">
      <div className="skills_item__description__topik">{props.skillsItemDescriptionTopik}</div>
      <div className="skills_item__description__subj">{props.skillsItemDescriptionSubj}</div>
    </div>
  </div>


const AboutTopikText = ({ children }) =>
  <div className="about_topik__text">{children}</div>


const ClientsListItem = (props) =>
  <div className="clients_list__item">
    <img src={props.imgUrl} alt="" />
  </div>


const App = () =>
  <div className="App">


    {/* <!-- --------------------- White part ----------------------- --> */}

    <div className="whitepart">

      <Topik>Services</Topik>

      <div className="services">

        <Servicitem
          imgUrl="./images/Engineering_Service.png"
          topikName="Engineering Service"
          content="Software Development / Software Testing / Solutions Architecture / Business Analysis / Operations Support"
        />

        <Servicitem
          imgUrl="./images/Internet_of_Things.png"
          topikName="Internet of Things"
          content="Intelligent Mobility / Predictive Maintenance / Smart Manufacturing"
        />

        <Servicitem
          imgUrl="./images/Extended_Reality_XR.png"
          topikName="Extended Reality XR"
          content="VR / MR / AR"
        />

        <Servicitem
          imgUrl="./images/AL_ML.png"
          topikName="AL & ML"
          content="Artificial Intelligence / Intelligent Automation / Advanced Analytics"
        />

        <Servicitem
          imgUrl="./images/Big_Data.png"
          topikName="Big data & Analytics"
          content="BI & Augmented Analytics / Enterprise Data Platforms / Data Strategy and Governance"
        />

        <Servicitem
          imgUrl="./images/Blockchain.png"
          topikName="Blockchain"
          content="Создаем прибыльные интернет-магазины, маркетплейсы и агрегаторы"
        />

        <Servicitem
          imgUrl="./images/Game_Art.png"
          topikName="Game Art Production"
          content="Concept art, UI, illustration / 3D models and environments / VXT and animations"
        />

      </div>
      {/* <!-- services --> */}


      <div className="about_topik">
        <Topik>Portfolio</Topik>
        <AboutTopikText>Здесь будет какой-то текст который расскажет о услугах Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui suscipit at architecto nihil, obcaecati aperiam veniam repellat voluptatem impedit voluptates recusandae non deserunt officiis esse quia voluptate optio harum. Nesciunt, non enim quisquam sit sed ipsa magnam distinctio nisi deserunt sint expedita dolorum aspernatur
        </AboutTopikText>
      </div>



      <div className="portfolio_list">

        <PortfolioItem
          portfolioImg="./images/Portfolio_1.jpg"
          transparentLanding="Landing Page"
          transparentProjectname="Project Name"
          grayText="Создаем прибыльные интернет-магазины, маркетплейсы Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores blanditiis debitis laborum iste, asperiores illum cumque perspiciatis sed magni itaque provident molestiae culpa quibusdam nulla maxime sunt repellen"
        />

        <PortfolioItem
          portfolioImg="./images/Portfolio_2.jpg"
          transparentLanding="Landing Page"
          transparentProjectname="Project Name"
          grayText="Создаем прибыльные интернет-магазины, маркетплейсы"
        />

        <PortfolioItem
          portfolioImg="./images/Portfolio_3.jpg"
          transparentLanding="Landing Page"
          transparentProjectname="Project Name"
          grayText="Создаем прибыльные интернет-магазины, маркетплейсы"
        />

        <button className="buttonportfolio" onClick='location.href="#"'>All progect</button>
      </div>
      {/* <!-- portfolio_list --> */}



      {/* <!-- ====================== SKILLS ======================= --> */}

      <div className="skills">

        <SkilsItem
          skillsItemValue="2+"
          skillsItemDescriptionTopik="Years"
          skillsItemDescriptionSubj="Создаем прибыльные интернет-магазины, маркетплейсы Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga sunt numquam repellendus accusamus! Odit eaque illum modi nemo illo doloribus delectus quas omnis cum fugiat nam, voluptates dicta error laborum, in incidunt doloremque rem consectetur eos nostrum ad aliquid recusandae repellat saepe? Aut, nam magnam dolor architecto amet nulla nemo, ex fugiat culpa, quod dolorum nisi explicabo assumenda natus maxime labore repellendus saepe. Ducimus deleniti repellat explicabo sit"
        />

        <SkilsItem
          skillsItemValue="40+"
          skillsItemDescriptionTopik="Progect"
          skillsItemDescriptionSubj="Создаем прибыльные интернет-магазины, маркетплейсы"
        />

        <SkilsItem
          skillsItemValue="10+"
          skillsItemDescriptionTopik="Experts"
          skillsItemDescriptionSubj="Создаем прибыльные интернет-магазины, маркетплейсы"
        />

        <SkilsItem
          skillsItemValue="2+"
          skillsItemDescriptionTopik="Years"
          skillsItemDescriptionSubj="Создаем прибыльные интернет-магазины, маркетплейсы Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga sunt numquam repellendus accusamus! Odit eaque illum modi nemo illo doloribus delectus quas omnis cum fugiat nam, voluptates dicta error laborum, in incidunt doloremque rem consectetur eos nostrum ad aliquid recusandae repellat saepe? Aut, nam magnam dolor architecto amet nulla nemo, ex fugiat culpa, quod dolorum nisi explicabo assumenda natus maxime labore repellendus saepe. Ducimus deleniti repellat explicabo sit"
        />

      </div>
      {/* <!-- skills --> */}




      {/* ************************************ */}

      <div className="about_topik">
        <Topik>Clients</Topik>
        <AboutTopikText>Здесь будет какой-то текст который расскажет о услугах Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui suscipit at architecto nihil, obcaecati aperiam veniam repellat voluptatem impedit voluptates recusandae non deserunt officiis esse quia voluptate optio harum. Nesciunt, non enim quisquam sit sed ipsa magnam distinctio nisi deserunt sint expedita dolorum aspernatur
        </AboutTopikText>
      </div>

      <div className="clients">

        <div className="clients_list">
          <ClientsListItem
            imgUrl="./images/stada_color.png"
          />
          <ClientsListItem
            imgUrl="./images/Hunter_Logo.png"
          />
          <ClientsListItem
            imgUrl="./images/eroglulogoyeni_0.png"
          />
          <ClientsListItem
            imgUrl="./images/logo_krieken-bier.png"
          />
          <ClientsListItem
            imgUrl=""
          />
        </div>
        {/* <!-- ------------- clients_list -------------- --> */}
      </div>
      {/* <!-- ----- clients ------- --> */}


    </div >    {/* whitepart */}




  </div >  /* APP */

export default App;

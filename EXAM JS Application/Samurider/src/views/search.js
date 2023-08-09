import { html } from "../../node_modules/lit-html/lit-html.js";
import { search } from "../data/motors.js";
import { getUserData } from "../util.js";

const searchTemplate = (searchMotor) => html`
         <section id="search">

<div class="form">
  <h4>Search</h4>
  <form class="search-form">
    <input
      type="text"
      name="search"
      id="search-input"
    />
    <button class="button-list" @click=${searchMotor}>Search</button>
  </form>
</div>
<h4 id="result-heading">Results:</h4>
 
        </section>
`;

const resultTemplate = (searchMotor, result,) => html`
         <section id="search">

<div class="form">
  <h4>Search</h4>
  <form class="search-form">
    <input
      type="text"
      name="search"
      id="search-input"
    />
    <button class="button-list" @click=${searchMotor}>Search</button>
  </form>
</div>
<h4 id="result-heading">Results:</h4>
${result.length > 0
        ? html`
  ${result.map(
            (m) => html`
             <div class="search-result">
              <div class="motorcycle">
  <img src="${m.imageUrl}" alt="example1" />
  <h3 class="model">${m.model}</h3>
    <a class="details-btn" href="/dashboard/${m._id}">More Info</a>
</div>
</div>
`
        )}
  
  `
        : html` 
 <h2 class="no-avaliable">No result.</h2>`}
  <!--If there are matches display a div with information about every motorcycle-->
 
        </section>
`;
export function searchPage(ctx) {
    const userData = getUserData();
    ctx.render(searchTemplate(searchMotor));

    async function searchMotor(e) {
        e.preventDefault();
        const input = document.getElementById("search-input");
        
        if (input.value === '') {
          return alert('This field is required!');
      }
        const result = await search(input.value);
        ctx.render(resultTemplate(searchMotor, result, userData));
    }
}
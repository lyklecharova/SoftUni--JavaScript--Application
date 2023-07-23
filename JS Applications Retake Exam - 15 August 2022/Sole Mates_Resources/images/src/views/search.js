import { html } from "../../node_modules/lit-html/lit-html.js";
import { search } from "../data/shoes.js";
import { getUserData } from "../util.js";

const searchTemplate = (searchShoes) => html`
  <section id="search">
          <h2>Search by Brand</h2>

          <form class="search-wrapper cf">
            <input
              id="#search-input"
              type="text"
              name="search"
              placeholder="Search here..."
              required
            />
            <button type="submit"  @click=${searchShoes}>Search</button>
          </form>

          <h3>Results:</h3>
        </section>
`;

const resultTemplate = (searchShoes, result, userData) => html`
<section id="search">
          <h2>Search by Brand</h2>

          <form class="search-wrapper cf">
            <input
              id="#search-input"
              type="text"
              name="search"
              placeholder="Search here..."
              required
            />
            <button type="submit" @click = ${searchShoes}>Search</button>
          </form>

          <h3>Results:</h3>
          ${result.length > 0
        ? html`
          <div id="search-container">
          ${result.map(
            (shoe) => html`
            <ul class="card-wrapper">
              <!-- Display a li with information about every post (if any)-->
              
              <li class="card">
                <img src="${shoe.imageUrl}" alt="travis" />
                <p>
                  <strong>Brand: </strong><span class="brand">${shoe.brand}</span>
                </p>
                <p>
                  <strong>Model: </strong
                  ><span class="model">${shoe.model}</span>
                </p>
                <p><strong>Value:</strong><span class="value">${shoe.value}</span>$</p>
                ${userData
                    ? html`
                <a class="details-btn" href="">Details</a>
                `
                    : null}
              </li>
              </ul>`)}
          `
        : html`
         
          <h2>There are no results found.</h2>`}
        </section>
`;
export function searchPage(ctx) {
    const userData = getUserData();
    ctx.render(searchTemplate(searchShoes));

    async function searchShoes(e) {
        e.preventDefault();
        const input = document.getElementById("#search-input");
        const result = await search(input.value);
        ctx.render(resultTemplate(searchShoes, result, userData));
    }
}

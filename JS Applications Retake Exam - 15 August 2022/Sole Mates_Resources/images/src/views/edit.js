import { html } from "../../node_modules/lit-html/lit-html.js";
import { getById, updateShoes } from "../data/shoes.js";
import { createSubmitHandler } from "../util.js";

const editTemplate = (shoe, onEdit) => html`
  <section id="edit">
          <div class="form">
            <h2>Edit item</h2>
            <form class="edit-form" @submit=${onEdit}>
              <input
                type="text"
                name="brand"
                id="shoe-brand"
                placeholder="Brand"
                .value = ${shoe.brand}
              />
              <input
                type="text"
                name="model"
                id="shoe-model"
                placeholder="Model"
                .value = ${shoe.model}
              />
              <input
                type="text"
                name="imageUrl"
                id="shoe-img"
                placeholder="Image url"
                .value = ${shoe.imageUrl}
              />
              <input
                type="text"
                name="release"
                id="shoe-release"
                placeholder="Release date"
                .value = ${shoe.release}
              />
              <input
                type="text"
                name="designer"
                id="shoe-designer"
                placeholder="Designer"
                .value = ${shoe.designer}
              />
              <input
                type="text"
                name="value"
                id="shoe-value"
                placeholder="Value"
                .value = ${shoe.value}
              />

              <button type="submit">post</button>
            </form>
          </div>
        </section>
`;

export async function editPage(ctx) {
  const id = ctx.params.id;
  const album = await getById(id);
  ctx.render(editTemplate(album, createSubmitHandler(onEdit)));

  async function onEdit({
    brand, model, imageUrl, release, designer, value
  }) {
    if (
      [ brand, model, imageUrl, release, designer, value].some(
        (f) => f == ""
      )
    ) {
      return alert("All fields are required!");
    }
    await updateShoes(id, {
        brand, model, imageUrl, release, designer, value
    });
    ctx.page.redirect("/dashboard/" + id);
  }
}

import { html } from "../../node_modules/lit-html/lit-html.js";
import { getById, updateMotor } from "../data/motors.js";
import { createSubmitHandler } from "../util.js";

const editTemplate = (motor, onEdit) => html`
     <section id="edit">
            <h2>Edit Motorcycle</h2>
            <div class="form">
              <h2>Edit Motorcycle</h2>
              <form class="edit-form" @submit=${onEdit}>
                <input
                  type="text"
                  name="model"
                  .value = ${motor.model}
                  id="model"
                  placeholder="Model"
                />
                <input
                  type="text"
                  name="imageUrl"
                  .value = ${motor.imageUrl}
                  id="moto-image"
                  placeholder="Moto Image"
                />
                <input
                type="number"
                name="year"
                .value = ${motor.year}
                id="year"
                placeholder="Year"
              />
              <input
              type="number"
              name="mileage"
              .value = ${motor.mileage}
              id="mileage"
              placeholder="mileage"
            />
            <input
              type="number"
              name="contact"
              .value = ${motor.contact}
              id="contact"
              placeholder="contact"
            />
              <textarea
                id="about"
                name="about"
                .value = ${motor.about}
                placeholder="about"
                rows="10"
                cols="50"
              ></textarea>
                <button type="submit">Edit Motorcycle</button>
              </form>
          </div>
        </section>
`;

export async function editPage(ctx) {
    const id = ctx.params.id;
    const motor = await getById(id);
    ctx.render(editTemplate(motor, createSubmitHandler(onEdit)));

    async function onEdit({
        model,
        imageUrl,
        year,
        mileage,
        contact,
        about
    }) {
        if (
            [model,
                imageUrl,
                year,
                mileage,
                contact,
                about].some(
                    (f) => f == ""
                )
        ) {
            return alert("All fields are required!");
        }
        await updateMotor(id, {
            model,
            imageUrl,
            year,
            mileage,
            contact,
            about
        });
        ctx.page.redirect("/dashboard/" + id);
    }
}

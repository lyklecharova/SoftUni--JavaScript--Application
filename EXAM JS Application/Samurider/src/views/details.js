import { html } from "../../node_modules/lit-html/lit-html.js";
import { deleteMotor, getById } from "../data/motors.js";
import { getUserData } from "../util.js";

const detailsTemplate = (motor, onDelete) => html`
        <section id="details">
          <div id="details-wrapper">
            <img id="details-img" src="${motor.imageUrl}" alt="example1" />
            <p id="details-title">${motor.model}</p>
            <div id="info-wrapper">
              <div id="details-description">
                <p class="year">${motor.year}</p>
                <p class="mileage">${motor.mileage}</p>
                <p class="contact">${motor.contact}</p>
                   <p id = "motorcycle-description">
                   ${motor.about}</p>
                        </p>
              </div>
               ${motor.canEdit
          ? html`<div id="action-buttons">
            <a href="/dashboard/${motor._id}/edit" id="edit-btn">Edit</a>
            <a @click=${onDelete} href="javascript:void(0)" id="delete-btn">Delete</a>
          </div>`
            : null}
            </div>
        </div>
      </section>
`;

export async function detailsPage(ctx) {
    const id = ctx.params.id;
    const motors = await getById(id);
    const userData = getUserData();
  
    if (userData && userData._id == motors._ownerId) {
      motors.canEdit = true;
    }
    ctx.render(detailsTemplate(motors, onDelete));
  
    async function onDelete() {
      const choice = confirm("Are you sure?");
  
      if (choice) {
        await deleteMotor(id);
        ctx.page.redirect("/dashboard");
      }
    }
  }
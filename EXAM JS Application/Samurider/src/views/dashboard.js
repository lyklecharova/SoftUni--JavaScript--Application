import { html } from "../../node_modules/lit-html/lit-html.js";
import { getAllMotors } from "../data/motors.js";
import { getUserData } from "../util.js";

const dashboardTemplate = (motors) => html`
      <h2>Available Motorcycles</h2>
        <section id="dashboard">
          ${motors.length > 0
           ? motors.map(motorCard)
           : html`
           <h2 class="no-avaliable">No avaliable motorcycles yet.</h2>`}
        </section>
`;
const motorCard = (motor) => html` <div class="motorcycle">
<img src="${motor.imageUrl}" alt="example1" />
<h3 class="model">${motor.model}</h3>
<p class="year">${motor.year}</p>
<p class="mileage">${motor.mileage}</p>
<p class="contact">${motor.contact}</p>
<a class="details-btn" href="/dashboard/${motor._id}">More Info</a>
</div>`;

export async function dashboardPage(ctx) {
  const motors = await getAllMotors();
  const userData = getUserData();
  ctx.render(dashboardTemplate(motors));
}

import { Card, CardHeader, Divider } from "@nextui-org/react";

export default function PetDetailsPage() {
  return (
    <section>
      <img src="" alt="pet image" />
      <h2>Pet Name</h2>
      <Card>
        <p>birth date</p>
        <p>fgd</p>
        <Divider />
        <p>gender</p>
        <p>fd</p>
        <Divider />
        <p>species</p>
        <p>dfgs</p>
        <Divider />
        <p>breed</p>
        <p>gdfs</p>
        <Divider />
        <p>color/markings</p>
        <p>gdxvbnghdbxfgnbdnxgdzbzdf</p>
        <Divider />
        <p>chip reference</p>
        <p>3408789542b</p>
      </Card>

      <Card>
        <CardHeader>
          <h2>Appointments</h2>
          <div>
            <p>See all </p>
          </div>
        </CardHeader>
        <Divider />
        <Card></Card>
      </Card>
      <h1>Pet Details Page</h1>
    </section>
  );
}

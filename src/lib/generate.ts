import type Template from "../types/Template";

export function generate(template: Template): string {
  const { Unit, Service, Install } = template;

  const unitSection = [
    "[Unit]",
    `Description=${Unit.Description}`,
    Unit.After?.length != 0 ? `After=${Unit.After?.join(" ")}` : undefined,
    Unit.Before?.length != 0 ? `Before=${Unit.Before?.join(" ")}` : undefined,
  ]
    .filter(Boolean)
    .join("\n");

  const serviceSection = [
    "[Service]",
    `Type=${Service.Type}`,
    `Restart=${Service.Restart}`,
    Service.RuntimeMaxSec
      ? `RuntimeMaxSec=${Service.RuntimeMaxSec}`
      : undefined,
    Service.User ? `User=${Service.User}` : undefined,
    Service.Group ? `Group=${Service.Group}` : undefined,
    Service.ExecStart.map((exec) => `ExecStart=${exec}`).join("\n"),
    Service.ExecStop
      ? Service.ExecStop.map((exec) => `ExecStop=${exec}`).join("\n")
      : undefined,
    Service.ExecReload
      ? Service.ExecReload.map((exec) => `ExecReload=${exec}`).join("\n")
      : undefined,
    Service.Environment
      ? Service.Environment.map((env) => `Environment=${env}`).join("\n")
      : undefined,
    Service.EnvironmentFile
      ? Service.EnvironmentFile.map((file) => `EnvironmentFile=${file}`).join(
          "\n"
        )
      : undefined,
    Service.WorkingDirectory
      ? `WorkingDirectory=${Service.WorkingDirectory}`
      : undefined,
  ]
    .filter(Boolean)
    .join("\n");

  const installSection = ["[Install]", `WantedBy=${Install.WantedBy}`].join(
    "\n"
  );

  return [unitSection, serviceSection, installSection].join("\n\n");
}

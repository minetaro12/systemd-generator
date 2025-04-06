export default interface Template {
  Unit: {
    Description: string;
    After: string[];
    Before?: string[];
  };
  Service: {
    Type: "simple" | "forking" | "oneshot" | "notify" | "dbus" | "idle";
    Restart: "always" | "on-failure" | "no";
    RuntimeMaxSec?: number;
    User?: string;
    Group?: string;
    ExecStart: string[];
    ExecStop?: string[];
    ExecReload?: string[];
    Environment?: `${string}=${string}`[];
    EnvironmentFile?: string[];
    WorkingDirectory?: string;
  };
  Install: {
    WantedBy: string;
  };
}

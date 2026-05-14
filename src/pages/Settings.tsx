import { useState } from "react";
import { z } from "zod";
import { Loader2, User as UserIcon, Lock, Bell, SlidersHorizontal, Wheat as WheatIcon, ShieldAlert } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { authStorage } from "@/lib/auth";
import { usePreferences, type Units, type DateFormat } from "@/lib/preferences";
import { farms } from "@/data/mockData";
import { toast } from "sonner";

const profileSchema = z.object({
  fullName: z.string().trim().min(2, "Name must be at least 2 characters").max(100),
});

const passwordSchema = z
  .object({
    current: z.string().min(6, "Required"),
    next: z.string().min(6, "At least 6 characters").max(100),
    confirm: z.string(),
  })
  .refine((v) => v.next === v.confirm, {
    message: "Passwords don't match",
    path: ["confirm"],
  });

function initials(name: string) {
  return name
    .split(" ")
    .map((p) => p[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export default function Settings() {
  const user = authStorage.getUser();
  const { prefs, update } = usePreferences();

  const [fullName, setFullName] = useState(user?.fullName ?? "");
  const [savingProfile, setSavingProfile] = useState(false);
  const [profileErr, setProfileErr] = useState<string | undefined>();

  const [pwd, setPwd] = useState({ current: "", next: "", confirm: "" });
  const [pwdErr, setPwdErr] = useState<{ current?: string; next?: string; confirm?: string }>({});
  const [savingPwd, setSavingPwd] = useState(false);

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setProfileErr(undefined);
    const r = profileSchema.safeParse({ fullName });
    if (!r.success) {
      setProfileErr(r.error.issues[0].message);
      return;
    }
    setSavingProfile(true);
    await new Promise((res) => setTimeout(res, 400));
    authStorage.updateUser({ fullName: r.data.fullName });
    setSavingProfile(false);
    toast.success("Profile updated");
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setPwdErr({});
    const r = passwordSchema.safeParse(pwd);
    if (!r.success) {
      const fe: typeof pwdErr = {};
      r.error.issues.forEach((i) => {
        fe[i.path[0] as keyof typeof pwdErr] = i.message;
      });
      setPwdErr(fe);
      return;
    }
    setSavingPwd(true);
    await new Promise((res) => setTimeout(res, 500));
    setSavingPwd(false);
    setPwd({ current: "", next: "", confirm: "" });
    toast.success("Password updated (mock — wire to backend to persist)");
  };

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6">
      <header>
        <h1 className="text-2xl font-display font-bold">Settings</h1>
        <p className="text-sm text-muted-foreground">Manage your profile, preferences, and notifications.</p>
      </header>

      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="grid w-full grid-cols-2 sm:grid-cols-5">
          <TabsTrigger value="profile"><UserIcon className="h-4 w-4 mr-2" />Profile</TabsTrigger>
          <TabsTrigger value="account"><Lock className="h-4 w-4 mr-2" />Account</TabsTrigger>
          <TabsTrigger value="preferences"><SlidersHorizontal className="h-4 w-4 mr-2" />Preferences</TabsTrigger>
          <TabsTrigger value="notifications"><Bell className="h-4 w-4 mr-2" />Notifications</TabsTrigger>
          <TabsTrigger value="farm"><WheatIcon className="h-4 w-4 mr-2" />Farm defaults</TabsTrigger>
        </TabsList>

        {/* Profile */}
        <TabsContent value="profile" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Profile</CardTitle>
              <CardDescription>Update how your name appears across SmartDrop.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSaveProfile} className="space-y-5 max-w-lg">
                <div className="flex items-center gap-4">
                  <div className="h-16 w-16 rounded-full bg-primary/10 text-primary flex items-center justify-center text-lg font-semibold">
                    {initials(fullName || user?.email || "U")}
                  </div>
                  <div className="text-sm text-muted-foreground">Avatar uploads require backend storage.</div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="fullName">Full name</Label>
                  <Input id="fullName" value={fullName} onChange={(e) => setFullName(e.target.value)} maxLength={100} />
                  {profileErr && <p className="text-sm text-destructive">{profileErr}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" value={user?.email ?? ""} disabled />
                  <p className="text-xs text-muted-foreground">Email change requires backend.</p>
                </div>

                <Button type="submit" disabled={savingProfile}>
                  {savingProfile ? <Loader2 className="animate-spin" /> : "Save changes"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Account */}
        <TabsContent value="account" className="mt-6 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Change password</CardTitle>
              <CardDescription>Use at least 6 characters. Repeat to confirm.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleChangePassword} className="space-y-4 max-w-lg">
                <div className="space-y-2">
                  <Label htmlFor="cur">Current password</Label>
                  <Input id="cur" type="password" value={pwd.current} onChange={(e) => setPwd((p) => ({ ...p, current: e.target.value }))} />
                  {pwdErr.current && <p className="text-sm text-destructive">{pwdErr.current}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="new">New password</Label>
                  <Input id="new" type="password" value={pwd.next} onChange={(e) => setPwd((p) => ({ ...p, next: e.target.value }))} />
                  {pwdErr.next && <p className="text-sm text-destructive">{pwdErr.next}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="conf">Repeat new password</Label>
                  <Input id="conf" type="password" value={pwd.confirm} onChange={(e) => setPwd((p) => ({ ...p, confirm: e.target.value }))} />
                  {pwdErr.confirm && <p className="text-sm text-destructive">{pwdErr.confirm}</p>}
                </div>
                <Button type="submit" disabled={savingPwd}>
                  {savingPwd ? <Loader2 className="animate-spin" /> : "Update password"}
                </Button>
              </form>
            </CardContent>
          </Card>

          <Card className="border-destructive/40">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-destructive">
                <ShieldAlert className="h-4 w-4" /> Danger zone
              </CardTitle>
              <CardDescription>Account deletion requires backend.</CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="destructive" disabled>Delete account</Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Preferences */}
        <TabsContent value="preferences" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Preferences</CardTitle>
              <CardDescription>Personalize how SmartDrop looks and measures things.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 max-w-lg">
              
              <div className="space-y-2">
                <Label>Units</Label>
                <Select value={prefs.units} onValueChange={(v) => update({ units: v as Units })}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="metric">Metric (ha, mm, °C)</SelectItem>
                    <SelectItem value="imperial">Imperial (ac, in, °F)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Language</Label>
                <Select value={prefs.language} disabled>
                  <SelectTrigger><SelectValue placeholder="English" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en">English</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Date format</Label>
                <Select value={prefs.dateFormat} onValueChange={(v) => update({ dateFormat: v as DateFormat })}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="dmy">DD/MM/YYYY</SelectItem>
                    <SelectItem value="mdy">MM/DD/YYYY</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notifications */}
        <TabsContent value="notifications" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Notifications</CardTitle>
              <CardDescription>Choose what shows up in your alert feed.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-5 max-w-lg">
              {[
                { key: "highSeverity", label: "High-severity alerts", desc: "Critical irrigation and weather events." },
                { key: "dailySummary", label: "Daily irrigation summary", desc: "A morning recap across all your fields." },
                { key: "weatherWarnings", label: "Weather warnings", desc: "Heat, frost, and storm advisories." },
              ].map((row) => (
                <div key={row.key} className="flex items-center justify-between gap-4">
                  <div>
                    <p className="font-medium">{row.label}</p>
                    <p className="text-sm text-muted-foreground">{row.desc}</p>
                  </div>
                  <Switch
                    checked={prefs.notify[row.key as keyof typeof prefs.notify]}
                    onCheckedChange={(v) =>
                      update({ notify: { ...prefs.notify, [row.key]: v } })
                    }
                  />
                </div>
              ))}

              <div className="flex items-center justify-between gap-4 pt-2 border-t">
                <div>
                  <p className="font-medium">Email notifications</p>
                  <p className="text-sm text-muted-foreground">Requires backend.</p>
                </div>
                <Switch checked={false} disabled />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Farm defaults */}
        <TabsContent value="farm" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Farm defaults</CardTitle>
              <CardDescription>Defaults used when creating fields and viewing the dashboard.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 max-w-lg">
              <div className="space-y-2">
                <Label>Default farm</Label>
                <Select
                  value={prefs.defaultFarmId ?? ""}
                  onValueChange={(v) => update({ defaultFarmId: v || null })}
                >
                  <SelectTrigger><SelectValue placeholder="None" /></SelectTrigger>
                  <SelectContent>
                    {farms.map((f) => (
                      <SelectItem key={f.id} value={f.id}>{f.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="crop">Default crop type</Label>
                <Input id="crop" value={prefs.defaultCropType} onChange={(e) => update({ defaultCropType: e.target.value })} maxLength={50} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="soil">Default soil type</Label>
                <Input id="soil" value={prefs.defaultSoilType} onChange={(e) => update({ defaultSoilType: e.target.value })} maxLength={50} />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

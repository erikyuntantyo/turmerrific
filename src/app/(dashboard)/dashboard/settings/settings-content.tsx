"use client";

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/shared/ui/card";
import { Input } from "@/shared/ui/input";
import { Label } from "@/shared/ui/label";
import { Button } from "@/shared/ui/button";
import { useToast } from "@/shared/ui/toast";
import { settingsSections } from "@/features/dashboard/server/mock-data";

export function SettingsContent() {
  const { toast } = useToast();

  function handleSave(e: React.FormEvent) {
    e.preventDefault();
    toast({ title: "Settings saved", variant: "success" });
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold">Settings</h1>
        <p className="text-muted-foreground mt-1 text-sm">Configure your application preferences</p>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {settingsSections.map((section) => (
          <Card key={section.id}>
            <CardHeader>
              <CardTitle>{section.label}</CardTitle>
              <CardDescription>{section.description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {section.fields.map((field) => (
                <div key={field.id} className="grid gap-2">
                  <Label htmlFor={field.id}>{field.label}</Label>
                  <Input
                    id={field.id}
                    type={field.type}
                    defaultValue={field.value}
                    placeholder={field.placeholder}
                  />
                </div>
              ))}
            </CardContent>
          </Card>
        ))}

        <Button type="submit">Save Changes</Button>
      </form>
    </div>
  );
}

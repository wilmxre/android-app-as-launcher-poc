package com.loopeliemptywithkiosk;

import android.content.ComponentName;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.provider.Settings;
import android.util.Log;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

public class LauncherModule extends ReactContextBaseJavaModule {

    private static ReactApplicationContext reactContext;

    LauncherModule(ReactApplicationContext context) {
        super(context);
        reactContext = context;
    }

    @Override
    public String getName() {
        return "LauncherModule";
    }

    public static void resetPreferredLauncherAndOpenChooser() {
        Log.d("LauncherModule", "resetPreferredLauncherAndOpenChooser");
        PackageManager packageManager = reactContext.getPackageManager();
        ComponentName componentName = new ComponentName(reactContext, FakeHomeActivity.class);
        packageManager.setComponentEnabledSetting(componentName, PackageManager.COMPONENT_ENABLED_STATE_ENABLED, PackageManager.DONT_KILL_APP);

        Intent selector = new Intent(Intent.ACTION_MAIN);
        selector.addCategory(Intent.CATEGORY_HOME);
        selector.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
        reactContext.startActivity(selector);

        packageManager.setComponentEnabledSetting(componentName, PackageManager.COMPONENT_ENABLED_STATE_DEFAULT, PackageManager.DONT_KILL_APP);
    }

    @ReactMethod
    public void setAsDefaultLauncher() {
        try {
          resetPreferredLauncherAndOpenChooser();
        } catch (Exception e) {
            Log.e("LauncherModule", "Error setting default launcher: ", e);
        }
    }
    @ReactMethod
    public void openDefaultAppsSettings() {
        try {
            Intent intent = new Intent(Settings.ACTION_HOME_SETTINGS);
            intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
            reactContext.startActivity(intent);
        } catch (Exception e) {
            Log.e("LauncherModule", "Error opening default apps settings: ", e);
        }
    }
}

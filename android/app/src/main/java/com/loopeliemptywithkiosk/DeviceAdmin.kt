package com.loopeliemptywithkiosk

import android.app.admin.DeviceAdminReceiver
import android.content.Context
import android.content.Intent
import android.widget.Toast

class DeviceAdmin : DeviceAdminReceiver() {
    fun onEnabled(intent: Intent?, context: Context) {
        super.onEnabled(context, intent!!)
        Toast.makeText(context, context.getString(R.string.enabled), Toast.LENGTH_SHORT).show()
    }

    fun onDisabled(intent: Intent?, context: Context) {
        super.onDisabled(context, intent!!)
        Toast.makeText(context, context.getString(R.string.enabled), Toast.LENGTH_SHORT).show()
    }
}
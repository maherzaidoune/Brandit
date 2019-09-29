package com.satoripop.photoeditorsample;

import androidx.annotation.Nullable;
import androidx.appcompat.app.AppCompatActivity;

import android.app.Activity;
import android.content.Intent;
import android.net.Uri;
import android.os.Bundle;

import com.bumptech.glide.Glide;
import com.github.dhaval2404.imagepicker.ImagePicker;

import java.io.File;

import ja.burhanrashid52.photoeditor.PhotoEditor;
import ja.burhanrashid52.photoeditor.PhotoEditorView;


public class MainActivity extends AppCompatActivity {

    private File file;
    private Uri uri;
    PhotoEditorView mPhotoEditorView;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        mPhotoEditorView = findViewById(R.id.photoEditorView);

        ImagePicker.Companion.with(this)
                .galleryOnly()
                .start();
    }

    @Override
    protected void onActivityResult(int requestCode, int resultCode, @Nullable Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        file = ImagePicker.Companion.getFile(data);
        uri = data.getData();
        Glide.with(this).load(file.getPath()).into(mPhotoEditorView.getSource());
        PhotoEditor mPhotoEditor = new PhotoEditor.Builder(this, mPhotoEditorView)
                .setPinchTextScalable(true)
                .build();
    }
}

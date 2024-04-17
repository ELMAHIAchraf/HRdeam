<?php

namespace App\Helpers;

class ResponseHelper
{
    public static function success($message, $data, $code)
    {
        return response()->json([
            'message' => $message,
            'data' => $data
        ], $code);
    }
    public static function error($message, $code)
    {
        return response()->json([
            'message' => $message
        ], $code);
    }
}
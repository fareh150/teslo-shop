export const fileNamer = (
    req: Express.Request,
    file: Express.Multer.File,
    callback: Function
) => 
{
    // If the file is empty, return an error
    if (!file)
        return callback(new Error('File is empty'), false);

    const fileExtension = file.mimetype.split('/')[1];

    const fileName = `${file.fieldname}-${Date.now()}.${fileExtension}`;

    callback(null, 'nuevo nombre');
}
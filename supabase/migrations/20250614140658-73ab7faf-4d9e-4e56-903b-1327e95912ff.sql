
-- Table for user notebooks
CREATE TABLE public.notebooks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  name text NOT NULL,
  last_accessed timestamp with time zone DEFAULT now(),
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE
);

-- Table for materials inside a notebook
CREATE TABLE public.materials (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  notebook_id uuid NOT NULL REFERENCES public.notebooks(id) ON DELETE CASCADE,
  type text NOT NULL CHECK (type IN ('pdf', 'link', 'note')),
  name text NOT NULL,
  url text,
  content text,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.notebooks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.materials ENABLE ROW LEVEL SECURITY;

-- Only notebook owners can access their notebooks
CREATE POLICY "Select own notebooks" ON public.notebooks
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Insert own notebooks" ON public.notebooks
  FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Update own notebooks" ON public.notebooks
  FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Delete own notebooks" ON public.notebooks
  FOR DELETE USING (auth.uid() = user_id);

-- Materials: Only for notebooks the user owns
CREATE POLICY "Select own materials" ON public.materials
  FOR SELECT USING (
    notebook_id IN (
      SELECT id FROM public.notebooks WHERE user_id = auth.uid()
    )
  );
CREATE POLICY "Insert own materials" ON public.materials
  FOR INSERT WITH CHECK (
    notebook_id IN (
      SELECT id FROM public.notebooks WHERE user_id = auth.uid()
    )
  );
CREATE POLICY "Update own materials" ON public.materials
  FOR UPDATE USING (
    notebook_id IN (
      SELECT id FROM public.notebooks WHERE user_id = auth.uid()
    )
  );
CREATE POLICY "Delete own materials" ON public.materials
  FOR DELETE USING (
    notebook_id IN (
      SELECT id FROM public.notebooks WHERE user_id = auth.uid()
    )
  );
